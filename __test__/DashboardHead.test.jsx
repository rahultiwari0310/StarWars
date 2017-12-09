import 'raf/polyfill';      // Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import DashboardHead from '../js/views/DashboardHead.jsx';
import Enzyme, { shallow, mount, render } from 'enzyme';
/*
    Fix for Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none. To
    configure an adapter, you should call `Enzyme.configure({ adapter: new Adapter() })`
    before using any of Enzyme's top level APIs, where `Adapter` is the adapter
    corresponding to the library currently being tested.
*/
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('DashboardHead', () => {
    it('renders without error', () => {
        const componentTree = mount(
            <DashboardHead loggenInUser='Luke Skywalker' handleLogout={ ()=>{} }/>
        );
        expect(componentTree.length).toEqual(1);
        expect(componentTree).toMatchSnapshot();
    });

    it('handles logout click correctly', () => {
        const handleLogout = jest.fn(),
            luke = 'Luke Skywalker';
        const componentTree = mount(
            <DashboardHead loggedInUser={ luke } handleLogout={ handleLogout }/>
        );
        componentTree.find( '.dashboard__head__logout' ).simulate( 'click' );
        expect( handleLogout).toHaveBeenCalled();

        //Check if greeting is correctly rendered
        expect( componentTree.find( '.dashboard__head__greeting' ).text()).toEqual( ' Hello ' + luke + ' ! ' );

    });

});