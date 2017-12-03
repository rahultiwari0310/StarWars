import $ from 'jquery';
import React from 'react';

const PlanetDetailView = ( props ) => {

    return (
        <div className='planet'>
            <button className='planet__back search-results__button' onClick={ props.handleDetailBack }>&larr; Back</button>
            <p className='search__legend'> 1. { printLegends( props.terrainColorMap ) }</p>
            <div className='planet__detail'>
                <div className='planet__detail__item'>
                    <span className='planet__detail__item__label'> Name: </span>
                    <span className='planet__detail__item__value'> { props.name } </span>
                </div>
                <div className='planet__detail__item'>
                    <span className='planet__detail__item__label'> Population: </span>
                    <span className='planet__detail__item__value'> { props.population } </span>
                </div>
                <div className='planet__detail__item'>
                    <span className='planet__detail__item__label'> Terrain: </span>
                    <span className='planet__detail__item__value'> { props.terrain } { getTerrainViews( props.terrain, props.terrainColorMap ) } </span>
                </div>
                <div className='planet__detail__item'>
                    <span className='planet__detail__item__label'> Surface Water: </span>
                    <span className='planet__detail__item__value'> { props.surface_water } </span>
                </div>
                <div className='planet__detail__item'>
                    <span className='planet__detail__item__label'> Gravity: </span>
                    <span className='planet__detail__item__value'> { props.gravity } </span>
                </div>
                <div className='planet__detail__item'>
                    <span className='planet__detail__item__label'> Diameter: </span>
                    <span className='planet__detail__item__value'> { props.diameter } </span>
                </div>
                <div className='planet__detail__item'>
                    <span className='planet__detail__item__label'> Climate: </span>
                    <span className='planet__detail__item__value'> { props.climate } </span>
                </div>
                <div className='planet__detail__item'>
                    <span className='planet__detail__item__label'> Orbital Period: </span>
                    <span className='planet__detail__item__value'> { props.orbital_period } </span>
                </div>
                <div className='planet__detail__item'>
                    <span className='planet__detail__item__label'> Created: </span>
                    <span className='planet__detail__item__value'> { props.created } </span>
                </div>
            </div>
        </div>
    );

};

const printLegends = ( colorMap ) => {
    const result = [];
    for ( let key in colorMap ) {
        result.push(
            <span key={ key } className='terrain__legend'>
                <span className='terrain' style={ { backgroundColor: colorMap[ key ] } }/>
                <span className='terrain__name'> { key } </span>
            </span>
        );
    }
    return result;
};

const getTerrainViews = ( terrain, colorMap ) => {
    const result = [],
        terrainArray = terrain.split( ', ' );
    for ( let i = 0; i < terrainArray.length; i = i + 1 ) {
        const color = colorMap[ terrainArray[ i ] ];
        if ( color ) {
            result.push( <span key={ terrainArray[ i ] } className='terrain' style={ { backgroundColor: color } }/>);
        }
    }
    return result;

};

export default PlanetDetailView;
