import APP from 'modules/APP';
import React from 'react';
import DashboardHead from 'views/DashboardHead';
import SearchTableComponent from 'components/SearchTableComponent';

class Dashboard extends React.Component {

    /**
     * Constructor function.
     * Sets initial state and calls other functions to perform initialization steps.
     * @param props
     */
     constructor( props ) {
        APP.Utils.log( 'Dashboard.constructor()' );
        super( props );

     }

    /**
     * Invoked immediately before a component is unmounted and destroyed
     */
     componentWillMount() {
        APP.Utils.log( 'Dashboard.componentWillMount()' );

     }

   /**
    * render function
    */
    render() {
        APP.Utils.log( 'Dashboard.render()' );
        return (
            <div className='dashboard'>
                { this.printDashboardHead() }
                <SearchTableComponent loggedInUser={ this.props.loggedInUser }/>
            </div>
        );
    }

    /**
     * Invoked before a mounted component receives new props
     */
     componentDidMount() {
        APP.Utils.log( 'Dashboard.componentDidMount()' );
     }

    /**
     * Invoked immediately before a component is unmounted and destroyed
     */
     componentWillUnmount() {
        APP.Utils.log( 'Dashboard.componentWillUnmount()' );

     }

    /**
     * print Dashboard Head welcome message and logout option.
     */
    printDashboardHead() {
        APP.Utils.log( 'Dashboard.printDashboardHead()' );

        return (
            <DashboardHead { ...this.props } />
        );
    }
}

export default Dashboard;
