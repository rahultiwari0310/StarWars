import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import Login from 'components/Login';
import { expect } from 'chai';
import ReactTestUtils from 'react-dom/test-utils'; // ES6

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
    it('Login renders without crashing', () => {

        const login = Enzyme.mount( React.createElement( Login )),
            inputUsername = login.find( '#username' ),
            inputPassword = login.find( '#password'),
            error = login.find( '.hide'),
            submitButton = login.find( '.form__button' );

        inputUsername.value = 'Luke Skywalker';
        inputPassword.value = '19BB';

        login.handleSubmit = sinon.spy();

        expect( error ).to.have.length(1);

        inputUsername.simulate( 'change', inputUsername );
        inputPassword.simulate( 'change', inputPassword );
        submitButton.simulate( 'click' );

        expect( inputUsername ).to.have.length(1);
        expect( inputPassword ).to.have.length(1);
        expect( submitButton ).to.have.length(1);

    });
});