import React from 'react'
import { Redirect,Route } from 'react-router';


export const PrivateRoute = ({
    component: Component,
    ...rest
}) => {

    const authUser = window.localStorage.getItem('token')===null
    console.log(authUser)
    return (
        <Route {...rest}
            component={ (props) =>(
                (!authUser)
                ?   <Component {...props}/>
                :   <Redirect to="/login"/>

            ) }
        
        />
    )
}
