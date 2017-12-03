
import React from 'react';

const DashboardHead = ( props ) => {

    return (
        <h1 className='dashboard__head' >
            <span className='dashboard__head__greeting'> Hello { props.loggedInUser } ! </span>
            <Link to='/'><button className='dashboard__head__logout'>Logout</button></Link>
        </h1>
    );

};

export default DashboardHead;
