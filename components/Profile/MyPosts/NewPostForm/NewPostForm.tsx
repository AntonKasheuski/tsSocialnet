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

    /*const formik = useFormik({
        initialValues: {
            newPostText: ''
        },
        validate,
        onSubmit: values => {
            console.log(values)
            dispatch(addPost(values['newPostText']))
            formik.resetForm()
        },
    });*/

    return (
        <Formik
            initialValues={{newPostText: ''}}
            validate={validate}
            onSubmit={values => {
                dispatch(addPost(values['newPostText']))
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
            {/*{formik => (
                <form onSubmit={formik.handleSubmit}>
                    <div>
                    <textarea
                        className={s.textareaForm + " " + (formik.errors.newPostText ? s.error : "")}
                        placeholder={"Enter your text"}
                        {...formik.getFieldProps('newPostText')}
                    />
                    </div>
                    {formik.errors.newPostText && <div className={s.errorText}>{formik.errors.newPostText}</div>}
                    <div>
                        <button type={'submit'}>Add post</button>
                    </div>
                </form>
            )}*/}
        </Formik>
    )
}