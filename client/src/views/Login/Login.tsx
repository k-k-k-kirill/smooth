import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

//Components
import '../../components/Header/Header'
import ColumnedContent from '../../components/ColumnedContent/ColumnedContent'
import { ReactComponent as FormIllustration } from '../../assets/images/undraw_online_articles.svg'
import TextField from '../../components/UI/Form/TextField/TextField'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import LayoutVertical from '../../components/Layouts/LayoutVertical/LayoutVertical'
import InputError from '../../components/UI/Form/InputError/InputError'

//Actions
import actions from '../../store/actions/actions'

//Types
import { ApplicationState } from '../../index'
import { SubmissionValues, SubmissionErrors } from './types'

const validate = (values: SubmissionValues) => {
    const errors: SubmissionErrors = {}

    if(values.email === '') {
        errors.email = 'Please, enter your email to log in.'
    }

    if(values.password === '') {
        errors.password = 'Please, provide your password to log in.'
    }

    return errors
}

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = ({ history, location }) => {

    useEffect(() => {
        if(authenticated) {
            history.push('/upcoming')
        }    
    })

    const dispatch = useDispatch()

    const loading = useSelector((state: ApplicationState) => state.ui.loading)
    const authenticated = useSelector((state: ApplicationState) => state.auth.authenticated)
    const error = useSelector((state: ApplicationState) => state.error.message)

    //Use formik hook to create <Formik> component.
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async values => {
            if(values) {
                dispatch({ type: actions.auth.LOGIN_REQUEST, values })
            }
        }
    })

    return (
        <>
        { loading ? (
            <Loader />
        ) : (
            <LayoutVertical>
                <ColumnedContent>
                    <div className="col-lg-4 mb-6">
                        <h1 className="text-center">Log in</h1>

                        { error ? <p className="mb-4 text-center">{error}</p> : null }

                        <form onSubmit={formik.handleSubmit}>
                            {formik.errors.email ? <InputError>{formik.errors.email}</InputError> : null}
                            <TextField classes="mb-4" type="email" placeholder="Email" value={formik.values.email} name="email" id="email" change={formik.handleChange} />

                            {formik.errors.password ? <InputError>{formik.errors.password}</InputError> : null}
                            <TextField classes="mb-4" type="password" placeholder="Password" value={formik.values.password} name="password" id="password" change={formik.handleChange} />

                            <div className="d-flex flex-row justify-content-between button-group">
                                <Button type="submit" label="Log in" />
                                <Button label="Sign Up" purple clicked={() => history.push('/signup')} />
                            </div>
                        </form>
                    </div>
                    <div className="illustration-column offset-lg-1 col-lg-6">
                        <FormIllustration />
                    </div>
                </ColumnedContent>
            </LayoutVertical>
        ) }
        </>
    )
}

export default withRouter(Login)
