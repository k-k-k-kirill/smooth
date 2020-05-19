import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from '../../axios/instance'
import { useDispatch } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

//Components
import '../../components/Header/Header'
import ColumnedContent from '../../components/ColumnedContent/ColumnedContent'
import { ReactComponent as FormIllustration } from '../../assets/images/undraw_online_articles.svg'
import TextField from '../../components/UI/Form/TextField/TextField'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import LayoutVertical from '../../components/Layouts/LayoutVertical/LayoutVertical'

//Actions
import authActions from '../../store/actions/auth'

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = ({ history, location }) => {
    const [ loading, setLoading ] = useState(false)
    const [ submissionError, setSubmissionError ] = useState('')

    const dispatch = useDispatch()

    //Use formik hook to create <Formik> component.
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async values => {
            setLoading(true)

            try {
                const res = await axios.post('/user/login', {...values})
                const token = res.data

                dispatch({ type: authActions.SAVE_TOKEN, accessToken: token })

                history.push('/user')
                setSubmissionError('')
            }catch(err) {
                if( err.response.status === 400 || err.response.status === 404 ) {
                    setSubmissionError('Wrong e-mail or password.')
                } else {
                    setSubmissionError('Our login system is experiencing issues. Please, try again later.')
                }
            }

            setLoading(false)
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

                        { submissionError ? <p className="mb-4 text-center">{submissionError}</p> : null }

                        <form onSubmit={formik.handleSubmit}>

                            <TextField classes="mb-4" type="email" placeholder="Email" value={formik.values.email} name="email" id="email" change={formik.handleChange} />

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
