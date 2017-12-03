import $ from 'jquery';
import React from 'react';
import APP from 'modules/APP';

//Prints search table if results found.
const SearchTableView = ( props ) => {

    return (
       <div className='search-content__table'>
           <p className='search__legend'> 1. Population bar uses logarithmic normalisations to manage population graph width. 100% population represents population of Coruscant planet.</p>
           <p className='search__legend'> 2. population_graph_width = ( log planet_population/ log coruscant_planet_population )/1.3</p>
           <p className='search__legend'> 3. Click on any planet item to view detailed planet info.</p>
           <table className='search-results'>
               <colgroup>
                   <col width='20%'/>
                   <col width='10%'/>
                   <col width='20%'/>
                   <col width='50%'/>
               </colgroup>
               <thead className='search__table__head'>
                   <tr className='search__table__row'>
                       <th className='search__table__column'>Name</th>
                       <th className='search__table__column'>Gravity</th>
                       <th className='search__table__column'>Terrain</th>
                       <th className='search__table__column'>Population</th>
                   </tr>
               </thead>
               <tbody>
               { printTableRows( props ) }
               </tbody>
           </table>
           { printNavButtons( props ) }
       </div>
    );

};

//Prints navigation buttons next and back if more results.
const printNavButtons = ( props ) => {

    const result = [];

    if ( props.data.previous ) {
        result.push( <button key='prev' className='search-results__button' onClick={ () => { props.handleNavClick( props.data.previous ); } }> &larr; Previous </button> );
    }
    if ( props.data.next ) {
        result.push( <button key='next' className='search-results__button' onClick={ () => { props.handleNavClick( props.data.next ); } }> Next &rarr; </button> );
    }
    return (
        <div className='search-results__nav'>
            { result }
        </div>
    );
};


//Prints single table row item.
const printTableRows = ( props ) => {

    const result = [],
        items = props.data.results;

    for ( let i = 0; i < items.length; i = i + 1 ) {

        const item = items[ i ];

        result.push( (
            <tr className='search__table__row' key={ item.url } onClick={ () => { props.handlePlanetClick( item ); } }>
                <td className='search__table__column'> { item.name } </td>
                <td className='search__table__column'> { item.gravity } </td>
                <td className='search__table__column'> { item.terrain } </td>
                <td className='search__table__column'> { getPopulationView( item.population ) } </td>
            </tr>
        ) );

    }
    return result;

};

//Creates population bar view if population type is number.
const getPopulationView = ( population ) => {
    return(
        <p className='planet__population'>
            <span className='planet__population__value'> { population } </span>
            { getPopulationBar( population ) }
        </p>
    );
};

//Return population bar if population type is number
const getPopulationBar = ( population ) => {
    const _population = parseInt( population );
    if ( isNaN( _population ) ) {
        return null;
    } else {

        const _scale = ( Math.log10( _population )/Math.log10( APP.Constants.MAX_POPULATION ) ),    //Normalised scale with base of log10.
            _style = {
                transform: 1 <= _scale ? 'scaleX( 1 )': 'scaleX( ' + ( _scale/1.3 ).toFixed( 3 ) + ' )'
            };
        return (
            <span className='planet__population__graph'>
                <span className='planet__population__graph__score' style={ _style }/>
            </span>
        );
    }
};

export default SearchTableView;
