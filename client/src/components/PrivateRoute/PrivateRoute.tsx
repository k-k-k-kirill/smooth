import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component, ...rest}: any) => {
    let isAuthenticated = false
    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{
                pathname: '/login',
                state: {
                    protected: true
                }
            }} />
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute