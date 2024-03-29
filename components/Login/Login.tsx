import React from 'react';
import {useFormik} from 'formik';
import s from "./Login.module.css"
import {Navigate} from "react-router-dom";
import {logIn, setErrorMessage} from "../../redux/authSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxToolkitHooks";

type LoginValuesType = {
    login: string
    password: string
    checkbox: boolean
}
type ValidateType = {
    login?: string
    password?: string
}

const validate = (values: LoginValuesType) => {
    const errors: ValidateType = {};
    if (!values.login) {
        errors.login = 'Required';
    } else if (values.login.length > 30) {
        errors.login = 'Must be 30 characters or less';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less';
    }
    return errors
}

const Login = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const errorMessage = useAppSelector(state => state.auth.errorMessage)
    const dispatch = useAppDispatch();

    const onChangeFormHandler = () => {
        !errorMessage && dispatch(setErrorMessage({errorMessage: null}))
    }

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            checkbox: false,
        },
        validate,
        onSubmit: values => {
            dispatch(logIn({email: values['login'], password: values['password'], rememberMe: values['checkbox']}))
        },
    });

    if (isAuth) {
        return <Navigate replace to="/profile"/>
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit} onChange={onChangeFormHandler}>
                <div>
                    <input
                        className={s.inputForm + " " + (formik.errors.login && formik.touched.login ? s.error : "")}
                        placeholder={'login'}
                        {...formik.getFieldProps('login')}
                    />
                    {formik.errors.login && formik.touched.login &&
                        <div className={s.errorText}>{formik.errors.login}</div>}
                </div>
                <div>
                    <input
                        className={s.inputForm + " " + (formik.errors.password && formik.touched.password ? s.error : "")}
                        placeholder={'password'}
                        type={"password"}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && formik.touched.password &&
                        <div className={s.errorText}>{formik.errors.password}</div>}
                </div>
                <div className={s.errorText}>
                    {errorMessage && errorMessage}
                </div>
                <div>
                    <input
                        type={'checkbox'}
                        {...formik.getFieldProps('checkbox')}
                    /> remember me
                </div>
                <div>
                    <button type={'submit'}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default React.memo(Login);