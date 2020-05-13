import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from '../../axios/instance'

//User components
import '../../components/Header/Header'
import Header from '../../components/Header/Header'
import ColumnedContent from '../../components/ColumnedContent/ColumnedContent'
import { ReactComponent as FormIllustration } from '../../assets/images/undraw_online_articles.svg'
import TextField from '../../components/UI/Form/TextField/TextField'
import Button from '../../components/UI/Button/Button'
import InputError from '../../components/UI/Form/InputError/InputError'
import Loader from '../../components/UI/Loader/Loader'

//Services
import isEmailUnique from '../../services/isEmailUnique'

//Utils and custom hooks
import useParser from '../../utils/queryParser'

interface FormErrors {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirm_password?: string
}

//Validator for sign up form
const validate = async (values: any) => {
    const errors: FormErrors = {}
    if (!values.firstName) {
      errors.firstName = 'This field is required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }
  
    if (!values.lastName) {
      errors.lastName = 'This field is required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }
  
    if (!values.email) {
      errors.email = 'This field is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    } else if( await isEmailUnique(values.email) === false) {
      errors.email = 'Account with such e-mail address already exists.'
    }

    if (!values.password) {
        errors.password = 'This field is required';
    } else if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Passwords don\'t match.'
    } 
    
    if (!values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
        errors.password = 'Your password must be between 8 to 15 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.'
    }

    if(!values.confirm_password) {
        errors.confirm_password = 'This field is required.'
    }
  
    return errors;
}

const Signup: React.FC = (props: any) => {
    const [ submissionSuccess, setSubmissionSuccess ] = useState(false)
    const [ submitted, setSubmitted ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    //Use formik hook to create <Formik> component.
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        validate,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async values => {
            setLoading(true)

            try {
                await axios.post('/user/signup', {...values})
                setSubmissionSuccess(true)
                setSubmitted(true)
            }catch(err) {
                setSubmissionSuccess(false)
                setSubmitted(true)
            }

            setLoading(false)
        }
    })

    //Custom handler for e-mail field blur event that checks if e-mail is unique.
    const handleEmailBlur = async (e: any) => {
        const isUnique = await isEmailUnique(e.target.value)

        if(isUnique) {
            formik.setFieldError('email', '')
        } else {
            formik.setFieldError('email', 'Account with such e-mail address already exists.')
        }
    }

    //Create instance of URL parser to extract URL params.
    const urlParser = useParser()

    return (
        <>
        { loading ? (
            <Loader />
        ) : (
            <article>
                <Header />
                <ColumnedContent>
                    <div className="col-lg-5 mb-6">
                        <h1 className="text-center">Sign up</h1>
                        {urlParser.get('expired') ? (
                            <p className="mb-4">Your e-mail confirmation period has ended. Please, complete your registration again to create an account.</p>
                        ) : null}
                        {submitted ? (
                            <div>
                                {submissionSuccess ? (
                                    <>
                                    <p className="mb-4">We have sent confirmation e-mail to <strong>{formik.values.email}</strong>.</p> <p>Please, follow instructions in the e-mail to complete your registration!</p>
                                    </>
                                ) : (
                                    <p>An error occured on our server while processing your registration. Please, try again later.</p>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={formik.handleSubmit}>
                                {formik.errors.firstName ? <InputError>{formik.errors.firstName}</InputError> : null}
                                <TextField classes="mb-4" placeholder="First name" value={formik.values.firstName} name="firstName" id="firstName" change={formik.handleChange} blur={formik.handleBlur} />

                                {formik.errors.lastName ? <InputError>{formik.errors.lastName}</InputError> : null}
                                <TextField classes="mb-4" placeholder="Last name" value={formik.values.lastName} name="lastName" id="lastName" change={formik.handleChange} />

                                {formik.errors.email ? <InputError>{formik.errors.email}</InputError> : null}
                                <TextField classes="mb-4" type="email" placeholder="Email" value={formik.values.email} name="email" id="email" blur={handleEmailBlur} change={formik.handleChange} />

                                {formik.errors.password ? <InputError>{formik.errors.password}</InputError> : null}
                                <TextField classes="mb-4" type="password" placeholder="Password" value={formik.values.password} name="password" id="password" change={formik.handleChange} />

                                {formik.errors.confirm_password ? <InputError>{formik.errors.confirm_password}</InputError> : null}
                                <TextField classes="mb-6" type="password" placeholder="Confirm password" value={formik.values.confirm_password} name="confirm_password" id="confirm_password" change={formik.handleChange} />

                                <Button type="submit" fluid label="Create account" />
                            </form>
                        )}
                    </div>
                    <div className="illustration-column offset-lg-1 col-lg-6">
                        <FormIllustration />
                    </div>
                </ColumnedContent>
            </article>
        ) }
        </>
        
    )
}

export default Signup
