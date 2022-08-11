import { Form, Field } from "react-final-form";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import { signupUser, userSelector } from "./RegistrSlice";
import { useDispatch, useSelector } from "react-redux";

import { clearState } from "./RegistrSlice";

import {ReactComponent as Err} from "../../assets/icon-err.svg";
import {ReactComponent as Open} from "../../assets/eye-open.svg";
import {ReactComponent as Close} from "../../assets/eye-close.svg";

import { checkCapitalLetter, checkPassword } from "../../utils";

import "./RegistrLayout.scss"

const RegistrLayout = () => {
    const [passwordShown, setPasswordShown] = useState(false)
    const dispatch = useDispatch();
    const {isSuccess, isError, errorMessage} = useSelector(userSelector)
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await dispatch(signupUser(data));
    }

    useEffect(() => {
        return () => {
            dispatch(clearState());
        }
    }, []);

    useEffect(() => {
        if(isSuccess){
            dispatch(clearState());
            console.log("Зашёл");
            navigate("/", { replace: true });
        }

        if(isError) {
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <>
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
                        errors.name = 'Произошла ошибка. Поле должно быть заполнено!';
                    } else if (!checkCapitalLetter(values.name)) {
                        errors.name = 'Первая буква должна быть заглавной!'
                    } else if (values.name?.length < 3) {
                        errors.name = 'Поле должно содержать как минимум 3 символа';
                    }

                    if (!values.surname) {
                        errors.surname = 'Произошла ошибка. Поле должно быть заполнено!';
                    } else if (!checkCapitalLetter(values.surname)) {
                        errors.surname = 'Первая буква должна быть заглавной!'
                    } else if (values.surname?.length < 3) {
                        errors.surname = 'Поле должно содержать как минимум 3 символа';
                    }

                    if (!values.email) {
                        errors.email = 'Произошла ошибка. Поле должно быть заполнено!';
                    }

                    if (!values.password) {
                        errors.password = 'Произошла ошибка. Поле должно быть заполнено!';
                    } else if (!checkPassword.test(values.password)) {
                        errors.password = 'Пароль слишком простой. 6 символов: английские буквы верхнего и нижнего регистра, цифры и знаки.';
                    }

                    if (!values.repeatedPassword) {
                        errors.repeatedPassword = "Произошла ошибка. Поле должно быть заполнено!";
                    } else if (values.password !== values.repeatedPassword) {
                        errors.repeatedPassword = "Пароли не совпадают";
                    }
                    // console.log(errors)
                    return errors;
                }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} className="form">
                        <ul className="form__list">
                            <li className="form__item">
                                <h3 className="form__title">регистрация</h3>
                            </li>
                            <li className="form__item form__indent">
                                <Field name="name">
                                    {({ input, meta }) => (
                                        <>
                                            <input 
                                                {...input} 
                                                className="form__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type="text"
                                                placeholder="Имя"
                                                disabled={submitting}
                                                />

                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
                                        </>
                                    )}
                                </Field>
                            </li>

                            <li className="form__item form__indent">
                                <Field name="surname">
                                    {({ input, meta }) => (
                                        <>
                                            <input 
                                                {...input} 
                                                className="form__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type="text" 
                                                placeholder="Фамилия"
                                                disabled={submitting}
                                                />

                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
                                        </>
                                    )}
                                </Field>
                            </li>

                            <li className="form__item form__indent">
                                <Field name="email">
                                    {({ input, meta }) => (
                                        <>
                                            <input 
                                                {...input} 
                                                className="form__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type="email"
                                                placeholder="Электронная почта"
                                                disabled={submitting}
                                                />
                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
                                        </>
                                    )}
                                </Field>
                            </li>

                            <li className="form__item form__indent">
                                <Field name="password">
                                    {({ input, meta }) => (
                                        <div className="form__box-pas">
                                            <input 
                                                {...input} 
                                                className="form__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type={passwordShown ? "text" : "password"}
                                                placeholder="Введите пароль"
                                                disabled={submitting}
                                                />
                                            <button className="form__eye" onClick={togglePassword}>{passwordShown ? <Open/> : <Close/>}</button>

                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </li>

                            <li className="form__item form__indent">
                                <Field name="repeatedPassword">
                                    {({ input, meta }) => (
                                        <div className="form__box-pas">
                                            <input 
                                                {...input}
                                                className="form__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type={passwordShown ? "text" : "password"}
                                                placeholder="Повторите пароль"
                                                disabled={submitting}
                                                />
                                            <button className="form__eye" onClick={togglePassword}>{passwordShown ? <Open/> : <Close/>}</button>

                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </li>

                            <li className="form__item">
                                <button className="form__submit" type="submit" disabled={submitting}>Применить и войти</button>
                            </li>

                            <li className="form__item">
                                <p>Уже зарегистрированы? <Link to="/login" className="form__link">Вход</Link></p>
                            </li>
                        </ul>
                    </form>
                )
            }/>

            {errorMessage ? 
                <div className="form__err">
                    <Err className="form__err-icon"/>
                    <span>{errorMessage}</span>
                </div> : null
            }
        </>
    );
}
 
export default RegistrLayout;