import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GraphQLClient, request, gql } from "graphql-request";

const initialState = {
    processes: [],
    isFetching: false,
    isSuccess: false,
    isError: false
}

export const fetchProcess = createAsyncThunk(
    'process/fetchProcess',
    async () => {
        const endpoint = "http://localhost:4000/api";
        try {
            const graphQLClient = new GraphQLClient(endpoint, {
                headers: {
                    authorization: 'bearer ' + localStorage.getItem("token")
                }
            });

            // graph.setHeader('authorization', localStorage.getItem('token'));

            const query = gql`
                query {
                    processList {
                        id,
                        name,
                        numberOfExecutions,
                        averageLeadTime,
                        averageActiveTime,
                        employeesInvolvedProcess,
                        numberOfScenarios,
                        start,
                        end,
                        loading
                    }
                }
            `
            const data = await graphQLClient.request(query)
            // console.log(JSON.stringify(data, undefined, 2));
            // const data = await request(endpoint, query, variables);
            // console.log(JSON.stringify(data, undefined, 2));
            // localStorage.setItem('token', data.login.token);
            return data.processList;
        } catch(e) {
            return ("Ошибка сервера! Не удалось получить список процессов.");
        }
    }
)

export const processesSlice = createSlice({
    name: 'process',
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
        [fetchProcess.fulfilled]: (state, {payload}) => {
            // console.log(payload);
            state.isFetching = false;
            state.isSuccess = true;
            state.processes = payload
        },
        [fetchProcess.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchProcess.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.errorMessage
        }
    }
});

const {actions, reducer} = processesSlice;

export default reducer;

export const {
    clearState
} = actions;

export const processesSelector = (state) => state.process;