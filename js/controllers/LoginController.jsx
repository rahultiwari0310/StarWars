import APP from 'modules/APP';
import React from 'react';
import {render} from 'react-dom';
import { createElement } from 'react';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Auth from 'modules/Auth';

const LoginController = {

    //Starts the app. Renders login first by default.
    renderLogin() {

        return (
            <Router>
                <div>
                    <Route path={ APP.Constants.PAGE.DASHBOARD } render={ props => (
                        Auth.isAuthenticated ? (
                            <Dashboard handleLogout={ this.logOff } loggedInUser={ Auth.user }/>
                        ) : (
                            <Redirect to={ { pathname: APP.Constants.PAGE.HOME, state: { from: props.location } } }/>
                        )
                    ) }/>
                     <Route path={ APP.Constants.PAGE.HOME } component={ AppComponent } />
                </div>
            </Router>
        )
            
    },
    load() {
        render(
            this.renderLogin(),
            document.getElementById( 'app' ) );
    },
    logOff() {
        Auth.signout();
        window.location = APP.Constants.PAGE.HOME
    }
};

export default LoginController;


