import APP from 'modules/APP';
import React from 'react';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import { Redirect } from 'react-router-dom';
import Auth from 'modules/Auth';

class AppComponent extends React.Component {

    /**
     * Constructor function.
     * Sets initial state and calls other functions to perform initialization steps.
     * @param props
     */
     constructor( props ) {
        APP.Utils.log( 'AppComponent.constructor()' );
        super( props );
        this.state = {
            redirectToReferrer: false
        };
        this.loggedin = this.loggedin.bind( this );
     }

   /**
    * render function
    */
    render() {
        APP.Utils.log( 'AppComponent.render()' );
        const { from } = this.props.location.state || { from: { pathname: APP.Constants.PAGE.DASHBOARD } };
        const { redirectToReferrer } = this.state;
        if ( redirectToReferrer ) {
            return (
              <Redirect to={from}/>
            )
          }
        return this.renderLogin();
    }

    renderLogin() {
        APP.Utils.log( 'AppComponent.renderLogin()' );
        return <Login loggedin={ this.loggedin } />;
    }

    loggedin( user ) {
        Auth.authenticate( user );
        this.setState( { redirectToReferrer: true } );
    }
}

export default AppComponent;
