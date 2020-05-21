import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../index'

const PrivateRoute = ({component, ...rest}: any) => {
    let token = useSelector((state: ApplicationState) =>  state.auth.authenticated )

    console.log(token)

    const routeComponent = (props: any) => (
        token
            ? React.createElement(component, props)
            : <Redirect to={{
                pathname: '/login'
            }} />
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute