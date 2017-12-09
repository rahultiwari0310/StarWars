import APP from 'modules/APP';
import React from 'react';
import SearchTableView from 'views/SearchTableView';
import PlanetDetailView from 'views/PlanetDetailView';
import PreLoaderView from 'views/PreLoaderView';

class SearchTableComponent extends React.Component {

    /**
     * Constructor function.
     * Sets initial state and calls other functions to perform initialization steps.
     * @param props
     */
     constructor( props ) {
        APP.Utils.log( 'SearchTableComponent.constructor()' );
        super( props );
        this.state = {
            searchInput: '',    //Input entered in search field.
            planetsResponse: {  //Response of planets search. Initialised with results to check if response is present initially.
                results: []
            },
            selectedPlanet: {   //Selected planet item for detail view after search.
                name: ''
            },
            isValidating: false,        //Shows pre loader if true.
            ajaxMaxed: false        //Set to true if no. ajax is 15 in a minute.
        };
        this.data = {
            ajaxTimeout: 0,         //Will be used to store timeout id to clear timeout on next input.
            terrainColorMap: {          //Color map for terrain colors.
                grasslands: '#2C6805',
                jungle: '#035C0F',
                rainforests: '#03440C',
                swamps: '#8E5B06',
                swamp: '#8E5B06',
                lakes: '#2B9BF3',
                cityscape: '#02223B',
                rock: '#0A131A',
                desert: '#FAC47A',
                forests: '#037230',
                rivers: '#5DA0B2',
                volcanoes: '#F98109',
                ocean: '#3376F1',
                mountains: '#51260A'
            },
            ajaxCountInAMinute: 0,                                      //Ajax count in a minute
            isLuke: APP.Constants.USERS.LUKE === props.loggedInUser     //Set to true if Luke. No max ajax limit for a minute.
        };
        this.performScopeBindings();

        //Sets interval to reset ajax count after a minute.
        if( ! this.data.isLuke ) {
            this.setIntervalForLuke();
        }

     }

    /**
     * Invoked immediately before a component is unmounted and destroyed
     */
     componentWillMount() {
        APP.Utils.log( 'SearchTableComponent.componentWillMount()' );

     }

   /**
    * render function
    */
    render() {
        APP.Utils.log( 'SearchTableComponent.render()' );
        const _lukeClass = this.state.ajaxMaxed ? 'search__legend' : 'hide';
        return (
            <div className='search' >
                <div className='search__input__wrapper'>
                    <input type='text' className='input' placeholder='search planet name' value={ this.state.searchInput } onChange={ this.handleSearchInputChange }/>
                </div>
                <p className={ _lukeClass }> Only luke is allowed to make more than 15 searches in a minute. Try searching after a few seconds.</p>
                <div className='search__content'>
                    { this.getSearchContent() }
                    { this.getPreloader() }
                </div>
            </div>
        );
    }

    /**
     * preloader view if isValidating = true.
     * @returns {*}
     */
    getPreloader() {
        APP.Utils.log( 'SearchTableComponent.getPreloader()' );
        if( this.state.isValidating ) {
            return (
                <div className='preloader__wrapper'>
                    <PreLoaderView />
                </div>
            );
        } else {
            return null;
        }
    }

    /**
     * perform scope bindings
     */
    performScopeBindings() {
        APP.Utils.log( 'SearchTableComponent.performScopeBindings()' );
        this.handleSearchInputChange = this.handleSearchInputChange.bind( this );
        this.handleAjax = this.handleAjax.bind( this );
        this.handlePlanetClick = this.handlePlanetClick.bind( this );
        this.handleDetailBack = this.handleDetailBack.bind( this );
        this.sendAjax = this.sendAjax.bind( this );
    }

    /**
     * handle Search Input Change
     */
    handleSearchInputChange( event ) {
        APP.Utils.log( 'SearchTableComponent.handleSearchInputChange()' );

        //Reset search states to default.
        this.setState( { searchInput: event.currentTarget.value, selectedPlanet: { name: '' }, planetsResponse: { results: [] } } );

        //Send ajax if less than 15 or Luke
        if ( ( 15 > this.data.ajaxCountInAMinute ) || this.data.isLuke ) {

            //If search input present make ajax
            if ( event.currentTarget.value ) {
                this.handleAjax( APP.Utils.addGetParameters( APP.Constants.URLS.PLANETS, 'search=' + event.currentTarget.value ) );
            }

        } else {
            this.setState( { ajaxMaxed: true } );
        }
    }

    /**
     * handles ajax timeout
     * @param url
     */
    handleAjax( url ) {
        APP.Utils.log( 'SearchTableComponent.handleAjax()' );

        //Clear previous timeout if any.
        clearTimeout( this.data.ajaxTimeout );

        const sendAjax = () => {
            this.sendAjax( url );
            this.data.ajaxCountInAMinute = this.data.ajaxCountInAMinute + 1;
        };
        this.data.ajaxTimeout = setTimeout( sendAjax, 200 );
    }

    /**
     * send ajax
     */
    sendAjax( url ) {
        APP.Utils.log( 'SearchTableComponent.sendAjax()' );

        //Shows pre loader
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

                //Shows planets table and hides pre loader
                this.setState( { planetsResponse: response, isValidating: false } );
            }
        );
    }

    /**
     * get Search Content View
     */
    getSearchContent() {
        APP.Utils.log( 'SearchTableComponent.getSearchContent()' );

        //If selected plant view present then detail view of planet returned.
        if ( this.state.selectedPlanet.name ) {
            return (
                <PlanetDetailView
                    { ...this.state.selectedPlanet }
                    handlePlanetClick={ this.handlePlanetClick }
                    handleDetailBack={ this.handleDetailBack }
                    terrainColorMap = { this.data.terrainColorMap }
                />
            );
        } else if ( 0 < this.state.planetsResponse.results.length && this.state.searchInput  ) {        //If valid response present. Show planets search results.
            return (
                <SearchTableView
                    data={ this.state.planetsResponse }
                    handleNavClick={ this.sendAjax }
                    handlePlanetClick={ this.handlePlanetClick }
                />
            );
        } else {    //Returns default message.
            if ( this.state.isValidating ) {
                return null;
            } else {
                return (
                    <p className='no-results'> { this.state.searchInput ? 'No results found.' : 'Enter search term to view results.' } </p>
                );
            }
        }
    }

    /**
     * handleP planet item click to see detail planet view.
     */
    handlePlanetClick( selectedPlanet ) {
        APP.Utils.log( 'SearchTableComponent.handlePlanetClick()' );
        this.setState( { selectedPlanet: selectedPlanet } );
    }

    /**
     * handles click on back button of planet detail.
     */
    handleDetailBack() {
        APP.Utils.log( 'SearchTableComponent.handleDetailBack()' );
        this.setState( { selectedPlanet: { name: '' } } );
    }

    /**
     * set interval for minute timer
     */
    setIntervalForLuke() {
        APP.Utils.log( 'SearchTableComponent.setIntervalForLuke()' );
        setInterval( ()=> { this.data.ajaxCountInAMinute = 0; this.setState( { ajaxMaxed: false } ); }, 60000 );
    }
}

export default SearchTableComponent;
