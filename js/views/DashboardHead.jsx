
import React from 'react';

const DashboardHead = ( props ) => {

    return (
        <h1 className='dashboard__head' >
            <span className='dashboard__head__welcome'>Welcome to Star Wars planets Page.</span>
            <span className='dashboard__head__greeting'> Hello { props.loggedInUser } ! </span>
            <button className='dashboard__head__logout' onClick={ props.handleLogout }>Logout</button>
        </h1>
    );

};

export default DashboardHead;
