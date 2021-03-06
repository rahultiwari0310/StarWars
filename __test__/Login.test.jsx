import 'raf/polyfill';      // Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import Login from '../js/components/Login.jsx';
import Enzyme, { shallow, mount, render } from 'enzyme';
/*
    Fix for Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none. To
    configure an adapter, you should call `Enzyme.configure({ adapter: new Adapter() })`
    before using any of Enzyme's top level APIs, where `Adapter` is the adapter
    corresponding to the library currently being tested.
*/
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
    it('renders without error', () => {
        const componentTree = mount(
            <Login/>
        );
        expect( componentTree.length ).toEqual( 1 );
        expect( componentTree ).toMatchSnapshot();

    });

    it('rendered elements correctly', () => {
        const componentTree = shallow(
            <Login/>
        );

        expect( componentTree.find( '#username' ).length ).toEqual( 1 );
        expect( componentTree.find( '#password' ).length ).toEqual( 1 );
        expect(componentTree.find('.form__button').length ).toEqual( 1 );
        expect(componentTree.find( '.error' ).hasClass( 'hide' ) ).toEqual( true );
        expect( componentTree.state( [ 'isDirty' ] ) ).toEqual( false );
    });

});