import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import s from "./NewMessageForm.module.css"
import {addMessage} from "../../../../redux/dialogsSllice";
import {useAppDispatch} from "../../../../hooks/reduxToolkitHooks";


const validate = (values: { newMessageText: string }) => {
    let errors: { newMessageText?: string } = {}
    if (!values.newMessageText) {
        errors.newMessageText = 'Required'
    } else if (values.newMessageText.length > 50) {
        errors.newMessageText = 'Must be 50 characters or less'
    }
    return errors
}

export const NewMessageForm = () => {
    const dispatch = useAppDispatch()

    return (
        <Formik
            initialValues={{newMessageText: ''}}
            validate={validate}
            onSubmit={(values, {resetForm}) => {
                dispatch(addMessage(values['newMessageText']))
                resetForm()
            }}
        >
            <Form>
                <div>
                    <Field name="newMessageText" as="textarea" placeholder="Enter your text" />
                </div>
                <div className={s.errorText}>
                    <ErrorMessage name="newMessageText"/>
                </div>
                <div>
                    <button type={'submit'}>Add message</button>
                </div>
            </Form>
        </Formik>
    )
}