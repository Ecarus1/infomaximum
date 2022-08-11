import { useDispatch, useSelector } from "react-redux";
import { userLoginSelector, editProfile, clearState } from '../loginLayout/LoginSlice';
import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";

import {ReactComponent as Open} from "../../assets/eye-open.svg";
import {ReactComponent as Close} from "../../assets/eye-close.svg";
import "./Profile.scss";

import { checkCapitalLetter, checkPassword } from "../../utils";

const Profile = () => {
    const [passwordShown, setPasswordShown] = useState(false)
    const dispatch = useDispatch();
    const {name, surname, isFetching, isSuccess, isError, errorMessage} = useSelector(userLoginSelector);
    const hello = `${name} ${surname}. Редактирование`;
    // let writeInButton = "Сохранить"
    const [writeInButton, setWriteInButton] = useState("Сохранить");

    useEffect(() => {
        return () => {
            dispatch(clearState());
        }
    }, []);

    useEffect(() => {
        if(isSuccess){
            console.log("Тут")
            setWriteInButton("Сохранено");

            const timer = setTimeout(() => {
                setWriteInButton("Сохранить");
            }, 3000);

            return () => {
                clearTimeout(timer);
                dispatch(clearState());
            }
        }

        if(isError) {
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    const onSubmit = async (data) => {
        console.log(data)
        await dispatch(editProfile(data))
    }

    const togglePassword = (event) => {
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
            render={({handleSubmit, errors, form, submitting, pristine, values}) => (
                <form 
                    onSubmit={handleSubmit}
                    className="profile" >
                    <div className="profile__box">
                        <h1 className="profile__hello">{hello}</h1>
                        <button className="profile__btn" type="submit" disabled={submitting || Object.keys(errors).length}>{writeInButton}</button>
                    </div>

                    <div className="profile__form">
                        <ul className="profile__list">
                            <li className="profile__item">
                                <h2 className="profile__text">Имя</h2>

                                <Field name="name">
                                    {({ input, meta }) => (
                                        <div className="profile__err-box">
                                            <input 
                                                {...input} 
                                                className="profile__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type="text"
                                                placeholder="Имя"/>

                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </li>

                            <li className="profile__item">
                                <h2 className="profile__text">Фамилия</h2>

                                <Field name="surname">
                                    {({ input, meta }) => (
                                        <div className="profile__err-box">
                                            <input 
                                                {...input} 
                                                className="profile__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type="text"
                                                placeholder="Фамилия"/>

                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </li>

                            <li className="profile__item">
                                <h2 className="profile__text">Электронная почта</h2>

                                <Field name="email">
                                    {({ input, meta }) => (
                                        <div className="profile__err-box">
                                            <input 
                                                {...input} 
                                                className="profile__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type="email"
                                                placeholder="Электронная почта"/>

                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </li>

                            <li className="profile__item">
                                <h2 className="profile__text">Новый пароль</h2>

                                <Field name="password">
                                    {({ input, meta }) => (
                                        <div className="form__box-pas profile__err-box">
                                            <input 
                                                {...input} 
                                                className="profile__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type={passwordShown ? "text" : "password"}
                                                placeholder="Новый пароль"/>
                                            <button className="form__eye" onClick={togglePassword}>{passwordShown ? <Open/> : <Close/>}</button>

                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </li>

                            <li className="profile__item">
                                <h2 className="profile__text">Повторный пароль</h2>

                                <Field name="repeatedPassword">
                                    {({ input, meta }) => (
                                        <div className="form__box-pas profile__err-box">
                                            <input 
                                                {...input} 
                                                className="profile__input"
                                                style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                                type={passwordShown ? "text" : "password"}
                                                placeholder="Повторный пароль"/>
                                            <button className="form__eye" onClick={(e) => togglePassword(e)}>{passwordShown ? <Open/> : <Close/>}</button>

                                            {meta.error && meta.touched && <span className="form__err-mini">{meta.error}</span>}
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