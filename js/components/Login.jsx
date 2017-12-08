import APP from 'modules/APP';
import React from 'react';
import $ from 'jquery';
import PreLoaderView from 'views/PreLoaderView';

class Login extends React.Component {

    /**
     * Constructor function.
     * Sets initial state and calls other functions to perform initialization steps.
     * @param props
     */
     constructor( props ) {
        APP.Utils.log( 'Login.constructor()' );
        super( props );
        this.state = {
            usernameEntered: '',        //Username input entered matched with "name" property
            passwordEntered: '',        //Password entered matched with "birth_year" property
            isDirty: false,             //Once invalid credentials entered
            isValidating: false         //Validating inputs entered. Waiting for ajax response. Will be used to show and hide pre loader.
        };
        this.performScopeBindings();
     }

    /**
     * Invoked immediately before a component is unmounted and destroyed
     */
     componentWillMount() {
        APP.Utils.log( 'Login.componentWillMount()' );
        this.data = {
            loggedInUser: ''        //Currently logged in user name.
        };

     }

   /**
    * render function
    */
    render() {
        APP.Utils.log( 'Login.render()' );
        return (
            <div className='login'>
                <h1 className='login__title' > Login using your name and birth year to search planets</h1>
                <form className='form' onSubmit={ this.handleSubmit } method='post'>
                    <span className={ this.state.isDirty && ! this.state.isValidating ? 'error' : 'error hide' }> Invalid Username or password. </span>
                    <div className='fields'>
                        <input type='text' id='username' value={ this.state.usernameEntered } name='username' placeholder='username' className='input' onChange={ this.onInputChange } />
                        { this.printPreLoader() }
                        <input type='password' id='password' value={ this.state.passwordEntered } name='password' placeholder='password' className='input' onChange={ this.onInputChange } />
                    </div>
                    <p className='form__button__wrapper'>
                        <input type='submit' className='form__button' value='Login'/>
                    </p>
                </form>
            </div>
        );
    }

    /**
     * handle fields input change
     */
    onInputChange( event ) {
        APP.Utils.log( 'Login.onInputChange()' );

        const _field = event.currentTarget;

        //Check if user name or password changed.
        if ( _field.id === APP.Constants.FIELDS.USERNAME ) {
            this.setState(
                {
                    usernameEntered: _field.value,
                    isDirty: false
                }
            );
        } else {
            this.setState(
                {
                    passwordEntered: _field.value,
                    isDirty: false
                }
            );
        }


    }

    /**
     * perform scope bindings
     */
    performScopeBindings() {
        APP.Utils.log( 'Login.performScopeBindings()' );
        this.onInputChange = this.onInputChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    //Handles form submit.
    handleSubmit( event ) {
        APP.Utils.log( 'Login.handleSubmit()' );
        event.preventDefault();
        if ( this.state.usernameEntered && this.state.passwordEntered ) {
            this.handleAjax( APP.Utils.addGetParameters( APP.Constants.URLS.PEOPLE, 'search=' + this.state.usernameEntered ) );
        } else {
            this.setState( { isDirty: true } );
        }
    }

    /**
     * Handles ajax for first validation or next.
     */
    handleAjax( url ) {
        APP.Utils.log( 'Login.handleAjax()' );

        //Shows pre loader before making ajax call.
        this.setState(
            {
                isValidating: true
            }
        );

        APP.Utils.ajax(
            {
                url: url
            }
        ).done(
            ( response ) => {

                //Hides pre loader on getting response.
                this.setState(
                    {
                        isValidating: false
                    }
                );

                //Matches for valid or invalid inputs.
                switch ( this.validateFields( response ) ) {

                    case APP.Constants.MATCH.VALID:

                        //code for login
                        this.setState( { isDirty: false } );
                        this.props.loggedin( this.data.loggedInUser );
                        break;

                    //Invalid credentials
                    case APP.Constants.MATCH.INVALID:

                        //Shows invalid username message.
                        this.setState( { isDirty: true } );
                        break;

                    default:
                        break;
                }
            }
        );
    }

    /**
     * validate name and birth year
     */
    validateFields( response ) {
        APP.Utils.log( 'Login.validateFields()' );

        const people = response.results;

        //Check from the current people page response.
        if ( this.checkPeopleList( people ) ) {
            return APP.Constants.MATCH.VALID;
        } else if ( ! APP.Utils.isUndefined( response.next ) ) {        //If name not present in current list and next url is present. Make an ajax to check from next page response.
            this.handleAjax( response.next );
        } else {
            return APP.Constants.MATCH.INVALID;     //If next url is also not present, declare invalid credentials.
        }
    }

    /**
     * check people List for name and birth year match.
     */
    checkPeopleList( people ) {
        APP.Utils.log( 'Login.checkPeopleList()' );
        for ( let i = 0; i < people.length; i = i + 1 ) {
            const item = people[ i ];

            //Return true if username and password matched.
            if ( item.name === this.state.usernameEntered && item.birth_year === this.state.passwordEntered ) {
                this.data.loggedInUser = item.name;
                return true;
            }
        }
        return false;
    }

    /**
     * print pre loader or login button
     */
    printPreLoader() {
        APP.Utils.log( 'Login.printPreLoader()' );

        if ( this.state.isValidating ) {
            return ( <PreLoaderView /> );
        } else {
            return null;
        }
    }


}

export default Login;
