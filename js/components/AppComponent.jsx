import APP from 'modules/APP';
import React from 'react';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import { Switch } from 'react-router-dom';

class AppComponent extends React.Component {

    /**
     * Constructor function.
     * Sets initial state and calls other functions to perform initialization steps.
     * @param props
     */
     constructor( props ) {
        APP.Utils.log( 'AppComponent.constructor()' );
        super( props );
     }

   /**
    * render function
    */
    render() {
        APP.Utils.log( 'AppComponent.render()' );
        return this.renderLogin();
    }

    renderLogin() {
        APP.Utils.log( 'AppComponent.renderLogin()' );
        return <Login renderDashboard={ ( loggedInUser ) => { this.renderDashboard( loggedInUser ); } }/>;
    }

    renderDashboard( loggedInUser ) {
        APP.Utils.log( 'AppComponent.renderDashboard()' );
        const _props = {
            loggedInUser: loggedInUser,
            handleLogout: () => {
                this.renderLogin();
            }
        };
        return <Dashboard { ..._props } />;
    }
}

export default AppComponent;
