import React from 'react';
import {render} from 'react-dom';
import { createElement } from 'React';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import AppComponent from 'components/AppComponent';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const LoginController = {

    renderLogin( { match, location, history } ) {

        return createElement( Login, { match, location, history } );
    },

    renderDashboard( { match, location, history } ) {

        return createElement( Dashboard, { match, location, history } );
    },

    render() {

        render(
            createElement( Router, null,
                createElement( Switch, null,
                    createElement( Route, {
                        path: '/Star_wars',
                        render: this.renderLogin.bind( this ),
                        exact: true
                    } ),
                    createElement( Route, {
                        path: '/Star_wars/dashboard',
                        render: this.renderDashboard.bind( this ),
                        exact: true
                    } )
                )
            ),
            document.getElementById( 'app' ) );
    }
};

export default LoginController;


