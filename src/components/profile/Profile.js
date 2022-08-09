import { useDispatch, useSelector } from "react-redux";
import { userLoginSelector, editProfile, clearState } from '../loginLayout/LoginSlice';
import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";

import {ReactComponent as Open} from "../../assets/eye-open.svg";
import {ReactComponent as Close} from "../../assets/eye-close.svg";
import "./Profile.scss";

const Profile = () => {
    const [passwordShown, setPasswordShown] = useState(false)
    const dispatch = useDispatch();
    const {name, surname, isFetching, isSuccess, isError, errorMessage} = useSelector(userLoginSelector);
    const hello = `${name} ${surname}. Редактирование`;

    useEffect(() => {
        return () => {
            dispatch(clearState());
        }
    }, []);

    useEffect(() => {
        if(isSuccess){
            dispatch(clearState());
        }

        if(isError) {
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    const onSubmit = async (data) => {
        console.log(data)
        await dispatch(editProfile(data))
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{
                name: '',
                surname: '',
                email: '',
                password: '',
                repeatedPassword: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Обязательное поле';
                }
                if (!values.surname) {
                    errors.surname = 'Обязательное поле';
                }
                if (!values.email) {
                    errors.email = 'Обязательное поле';
                }
                if (!values.password) {
                    errors.password = 'Обязательное поле';
                } 
                if (!values.repeatedPassword) {
                    errors.repeatedPassword = "Обязательное поле";
                } else if (values.password !== values.repeatedPassword) {
                    errors.repeatedPassword = "Пароли не совпадают";
                }
                // console.log(errors)
                return errors;
            }}
            render={({handleSubmit, form, submitting, pristine, values}) => (
                <form onSubmit={handleSubmit} className="profile">
                    <div className="profile__box">
                        <h1 className="profile__hello">{hello}</h1>
                        <button className="profile__btn" type="submit" disabled={submitting}>Сохранить</button>
                    </div>

                    <div className="profile__form">
                        <ul className="profile__list">
                            <li className="profile__item">
                                <h2 className="profile__text">Имя</h2>

                                <Field name="name">
                                    {({ input, meta }) => (
                                        <input 
                                            {...input} 
                                            className="profile__input"
                                            style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                            type="text"
                                            placeholder="Имя"/>
                                    )}
                                </Field>
                            </li>

                            <li className="profile__item">
                                <h2 className="profile__text">Фамилия</h2>

                                <Field name="surname">
                                    {({ input, meta }) => (
                                        <input 
                                            {...input} 
                                            className="profile__input"
                                            style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                            type="text"
                                            placeholder="Фамилия"/>
                                    )}
                                </Field>
                            </li>

                            <li className="profile__item">
                                <h2 className="profile__text">Электронная почта</h2>

                                <Field name="email">
                                    {({ input, meta }) => (
                                        <input 
                                            {...input} 
                                            className="profile__input"
                                            style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                            type="email"
                                            placeholder="Электронная почта"/>
                                    )}
                                </Field>
                            </li>

                            <li className="profile__item">
                                <h2 className="profile__text">Новый пароль</h2>

                                <Field name="password">
                                    {({ input, meta }) => (
                                        <div className="form__box-pas">
                                            <input 
                                                {...input} 
                                                className="profile__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type={passwordShown ? "text" : "password"}
                                                placeholder="Новый пароль"/>
                                            <button className="form__eye" onClick={togglePassword}>{passwordShown ? <Open/> : <Close/>}</button>
                                        </div>
                                    )}
                                </Field>
                            </li>

                            <li className="profile__item">
                                <h2 className="profile__text">Повторный пароль</h2>

                                <Field name="repeatedPassword">
                                    {({ input, meta }) => (
                                        <div className="form__box-pas">
                                            <input 
                                                {...input} 
                                                className="profile__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type={passwordShown ? "text" : "password"}
                                                placeholder="Повторный пароль"/>
                                            <button className="form__eye" onClick={togglePassword}>{passwordShown ? <Open/> : <Close/>}</button>
                                        </div>
                                    )}
                                </Field>
                            </li>

                        </ul>
                    </div>
                </form>
            )}
        />
    );
}
 
export default Profile;