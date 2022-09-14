import React from "react";
import {ErrorMessage, Form, Formik, Field} from "formik";
import {addPost} from "../../../../redux/profileSlice";
import s from "./NewPostForm.module.css"
import {useAppDispatch} from "../../../../hooks/hooks";


const validate = (values: { newPostText: string }) => {
    let errors: { newPostText?: string } = {}
    if (!values.newPostText) {
        errors.newPostText = 'Required'
    } else if (values.newPostText.length > 50) {
        errors.newPostText = 'Must be 50 characters or less'
    }
    return errors
}

export const NewPostForm = () => {
    const dispatch = useAppDispatch()

    return (
        <Formik
            initialValues={{newPostText: ''}}
            validate={validate}
            onSubmit={(values, {resetForm}) => {
                dispatch(addPost(values['newPostText']))
                resetForm()
            }}
        >
            <Form>
                <div>
                    <Field name="newPostText" as="textarea" placeholder="Enter your text" />
                </div>
                <div className={s.errorText}>
                    <ErrorMessage name="newPostText"/>
                </div>
                <div>
                    <button type={'submit'}>Add post</button>
                </div>
            </Form>
        </Formik>
    )
}