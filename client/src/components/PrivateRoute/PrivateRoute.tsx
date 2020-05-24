import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../index'

const PrivateRoute = ({component, ...rest}: any) => {
    let authenticated = useSelector((state: ApplicationState) =>  state.auth.authenticated )

    const routeComponent = (props: any) => {
        return (
            authenticated === true
            ? React.createElement(component, props)
            : <Redirect to={{
                pathname: '/login'
            }} />
        )
    }
    return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute