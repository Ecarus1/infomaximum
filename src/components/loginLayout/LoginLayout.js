import { Form, Field } from "react-final-form";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userLoginSelector, loginUser, clearState } from "./LoginSlice";

import "../registrLayout/RegistrLayout.scss";
import "./LoginLayout.scss";

import {ReactComponent as Err} from "../../assets/icon-err.svg";
import {ReactComponent as Open} from "../../assets/eye-open.svg";
import {ReactComponent as Close} from "../../assets/eye-close.svg";

const LoginLayout = () => {
    const [passwordShown, setPasswordShown] = useState(false)

    const dispatch = useDispatch();
    const {isFetching, isSuccess, isError, errorMessage} = useSelector(userLoginSelector)
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await dispatch(loginUser(data));
    }
    
    useEffect(() => {
        return () => {
            dispatch(clearState());
        }
    }, [])

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
                    email: '',
                    password: ''
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Обязательное поле';
                    }
                    if (!values.password) {
                        errors.password = 'Обязательное поле';
                    } 
                    // console.log(errors)
                    return errors;
                }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} className="form">
                        <ul className="form__list">
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

                            <li className="form__item">
                                <button className="form__submit" type="submit" disabled={submitting}>Войти в систему</button>
                            </li>

                            <li className="form__item">
                                <p><Link to="/registr" className="form__link">Зарегестрироваться</Link></p>
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
 
export default LoginLayout;