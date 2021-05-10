import React from 'react'
import { Redirect,Route } from 'react-router';

export const PublicRoute = ({
    component: Component,
    ...rest
}) => {

    const authUser = window.localStorage.getItem('token')===null
    console.log(authUser)
    return (
        <Route {...rest}
            component={ (props) =>(
                (!authUser)
                ?    <Redirect to="/repos"/>
                :   <Component {...props}/>

            ) }
        
        />
    )
}
