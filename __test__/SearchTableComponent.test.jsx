import 'raf/polyfill';      // Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import SearchTableComponent from 'components/SearchTableComponent.jsx';
import Enzyme, { shallow, mount, render } from 'enzyme';
/*
 Fix for Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none. To
 configure an adapter, you should call `Enzyme.configure({ adapter: new Adapter() })`
 before using any of Enzyme's top level APIs, where `Adapter` is the adapter
 corresponding to the library currently being tested.
 */
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchTableComponent', () => {
    it('renders without error', () => {
        const componentTree = mount(
            <SearchTableComponent/>
        );
        expect( componentTree.length ).toEqual( 1 );
        expect( componentTree ).toMatchSnapshot();

    });

    it('Check maximum searches in a minute if not Luke.', () => {
        jest.useFakeTimers();

        const componentTree = shallow(
            <SearchTableComponent />

        );

        const _searchField = componentTree.find( '.input' );

        //Expect input field to be blank on first render
        expect( componentTree.state( [ 'searchInput' ] ) ).toEqual( '' );

        //At first max ajax limit reached is set to false
        expect( componentTree.state( [ 'ajaxMaxed' ] ) ).toEqual( false );

        //Change input field value 16 times
        for ( let i = 0; i < 16; i = i + 1 ) {
            _searchField.simulate( 'change', { currentTarget: { value: '' + i } } );

            //Advance timers to let keypress delay pass
            jest.runTimersToTime( 300 );
        }

        //Time lengths to be 15 only because its not luke
        expect( setTimeout.mock.calls.length ).toBe( 15 );

        //Expect time out time to be 200
        expect( setTimeout.mock.calls[ 0 ][ 1 ]).toBe( 200 );

        //After 15 changes ajax limit reached
        expect( componentTree.state( [ 'ajaxMaxed' ] ) ).toEqual( true );
        expect( componentTree.instance().data.ajaxCountInAMinute ).toEqual( 15 );

        //This will run interval of resetting ajax count and limit
        jest.runOnlyPendingTimers();

        //Expect reset after a minute
        expect( componentTree.state( [ 'ajaxMaxed' ] ) ).toEqual( false );
        expect( componentTree.instance().data.ajaxCountInAMinute ).toEqual( 0 );

    });

    it('Check maximum searches if Luke.', () => {
        jest.useFakeTimers();

        const componentTree = shallow(
            <SearchTableComponent loggedInUser={ 'Luke Skywalker' }/>
        );

        const _searchField = componentTree.find('.input');

        for ( let i = 0; i < 20; i = i + 1 ) {
            _searchField.simulate( 'change', { currentTarget: { value: '' + i } } );

            //Advance timers to let keypress delay pass
            jest.runTimersToTime( 300 );
        }

        //Even after 20 searches ajax limit not reached for luke
        expect( componentTree.state([ 'ajaxMaxed' ] ) ).toEqual( false );
        expect( componentTree.instance().data.ajaxCountInAMinute ).toEqual( 20 );

    });

    it('check reset of ajax limit in 1 minute interval', () => {
        jest.useFakeTimers();

        const componentTree = shallow(
            <SearchTableComponent />
        );

        expect( componentTree.state( [ 'ajaxMaxed' ] ) ).toEqual( false );
        componentTree.setState( { ajaxMaxed: true } );
        expect( componentTree.state( [ 'ajaxMaxed' ] ) ).toEqual( true );

        //This will run interval of resetting ajax count and limit
        jest.runOnlyPendingTimers();
        expect( componentTree.state( [ 'ajaxMaxed' ] ) ).toEqual( false );
    });

});