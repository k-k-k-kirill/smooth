import React from 'react'
import { useFormik } from 'formik'

//User components
import '../../components/Header/Header'
import Header from '../../components/Header/Header'
import ColumnedContent from '../../components/ColumnedContent/ColumnedContent'
import { ReactComponent as FormIllustration } from '../../assets/images/undraw_online_articles.svg'
import TextField from '../../components/UI/Form/TextField/TextField'
import Button from '../../components/UI/Button/Button'
import InputError from '../../components/UI/Form/InputError/InputError'

interface FormErrors {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirm_password?: string
}

const validate = (values: any) => {
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
    }

    if (!values.password) {
        errors.password = 'This field is required';
    } else if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Passwords don\'t match.'
    } 
    
    // if (values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
    //     errors.password = 'Your password must be between 8 to 15 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.'
    // }

    if(!values.confirm_password) {
        errors.confirm_password = 'This field is required.'
    }
  
    return errors;
}

const Signup: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })

    return (
        <article>
            <Header />
            <ColumnedContent>
                <div className="col-lg-5 mb-6">
                    <h1 className="text-center">Sign up</h1>
                    <form onSubmit={formik.handleSubmit}>
                        {formik.errors.firstName ? <InputError>{formik.errors.firstName}</InputError> : null}
                        <TextField classes="mb-4" placeholder="First name" value={formik.values.firstName} name="firstName" id="firstName" change={formik.handleChange} blur={formik.handleBlur} />

                        {formik.errors.lastName ? <InputError>{formik.errors.lastName}</InputError> : null}
                        <TextField classes="mb-4" placeholder="Last name" value={formik.values.lastName} name="lastName" id="lastName" change={formik.handleChange} />

                        {formik.errors.email ? <InputError>{formik.errors.email}</InputError> : null}
                        <TextField classes="mb-4" placeholder="Email" value={formik.values.email} name="email" id="email" change={formik.handleChange} />

                        {formik.errors.password ? <InputError>{formik.errors.password}</InputError> : null}
                        <TextField classes="mb-4" placeholder="Password" value={formik.values.password} name="password" id="password" change={formik.handleChange} />

                        {formik.errors.confirm_password ? <InputError>{formik.errors.confirm_password}</InputError> : null}
                        <TextField classes="mb-6" placeholder="Confirm password" value={formik.values.confirm_password} name="confirm_password" id="confirm_password" change={formik.handleChange} />

                        <Button type="submit" fluid label="Create account" />
                    </form>
                </div>
                <div className="illustration-column offset-lg-1 col-lg-6">
                    <FormIllustration />
                </div>
            </ColumnedContent>
        </article>
    )
}

export default Signup
