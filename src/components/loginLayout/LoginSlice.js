import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GraphQLClient, request, gql } from "graphql-request";
import jwt_decode from "jwt-decode";

const initialState = {
    id: null,
    name: "",
    surname: "",
    email: "",
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({email, password}) => {
        const endpoint = "http://localhost:4000/api" ;
        const query = gql`
            mutation ($email: String!, $password: String!) {
                login(
                    email: $email,
                    password: $password
                ) {
                    token
                    user {
                        id
                        firstName
                        secondName
                        email
                    }
                }
            }
        `

        const variables = {
            email: email,
            password: password
        }

        const data = await request(endpoint, query, variables);
        console.log(JSON.stringify(data, undefined, 2));
        localStorage.setItem('token', data.login.token);
        return data.login;
    }
);


export const loginCheckUser = createAsyncThunk(
    'login/loginCheckUser',
    async () => {
        const endpoint = "http://localhost:4000/api";
        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {
                authorization: 'bearer ' + localStorage.getItem("token")
            }
        });

        const query = gql`
            query {
                currentUser {
                    id,
                    firstName,
                    secondName,
                    email
                }
            }
        `
        const data = await graphQLClient.request(query)
        return data.currentUser;
    }
);

export const editProfile = createAsyncThunk(
    'login/editProfile',
    async ({name, surname, email, password}) => {
        const endpoint = "http://localhost:4000/api";
        const graphQLClient = new GraphQLClient(endpoint);

        const query = gql`
            mutation ($id: Int!, $email: String!, $firstName: String!, $secondName: String!, $password: String!) {
                editUser(
                    id: $id,
                    email: $email
                    firstName: $firstName
                    secondName: $secondName
                    password: $password
                ) {
                    id
                    firstName
                    secondName
                    email
                }
            }
        `
        const variables = {
            id: jwt_decode(localStorage.getItem('token')).id,
            email: email,
            firstName: name,
            secondName: surname,
            password: password
        }

        const requestHeaders = {
            authorization: 'bearer ' + localStorage.getItem("token"),
        }

        const data = await graphQLClient.request(query, variables, requestHeaders);
        console.log(JSON.stringify(data, undefined, 2));
        return data.editUser;
    }
);


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        }
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.id = payload.user.id;
            state.name = payload.user.firstName;
            state.surname = payload.user.secondName;
            state.email = payload.user.email;
            state.token = payload.token;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [loginUser.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = "Неверный логин или пароль";
        },

        [loginCheckUser.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.id = payload.id;
            state.name = payload.firstName;
            state.surname = payload.secondName;
            state.email = payload.email;
        },
        [loginCheckUser.pending]: (state) => {
            state.isFetching = true;
        },
        [loginCheckUser.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = "Ошибка"
        },

        [editProfile.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.id = payload.id;
            state.name = payload.firstName;
            state.surname = payload.secondName;
            state.email = payload.email;
        },
        [editProfile.pending]: (state) => {
            state.isFetching = true;
            state.isSuccess = false;
        },
        [editProfile.rejected]: (state) => {
            state.isSuccess = false;
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = "Произошла ошибка"
        }
    }
});

const {actions, reducer} = loginSlice;

export default reducer;
export const {
    clearState
} = actions;

export const userLoginSelector = (state) => state.login;

