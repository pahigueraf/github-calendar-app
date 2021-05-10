import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Home } from '../components/Home';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    return (
        <Router>
            <>
                <Switch>
                    <PublicRoute exact path="/signup" component={Register} />
                    <PublicRoute exact path="/login" component={Login} />
                    <PrivateRoute exact path="/repos" component={Home} />
                    {/* <Route exact path="/events" component={Login} /> */}
                    <PublicRoute component={Login}/>
                </Switch>
            </>
        </Router>
    )
}
