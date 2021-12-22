import React from 'react';
// import AuthService from './auth-service'
import { Route, Redirect } from 'react-router-dom';

const protectedRoute  = ({component: Component, user, ...rest}) => {
console.log('protected route', {user})


    return (
    <Route
        {...rest}
        render={ props  => 
            user? (
                <Component {...props} {...rest} user={user}/>
            ) : (
                <Redirect to={{pathname: '/', state: { from: props.location } }} />
            )
        }
        
    />
    )
}
export default protectedRoute;