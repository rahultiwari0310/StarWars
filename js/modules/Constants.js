const Constants = {
    DEBUG_MODE: false,       //Debug mode true allows logs to print on console.
    PAGE: {
        HOME: '/StarWars',          //Home URL
        DASHBOARD: '/StarWars/dashboard'  //Dashboard URL
    },
    URLS: {
        PEOPLE: 'https://swapi.co/api/people',  //Swapi API people URL
        PLANETS: 'https://swapi.co/api/planets' //Swapi API planets URL
    },
    FIELDS: { //Fields ids
        USERNAME: 'username',
        PASSWORD: 'password'
    },
    MATCH: {        //Login credentials results
        VALID: 'VALID',
        INVALID: 'INVALID'
    },
    USERS: {        //Will be used to match for Luke.
        LUKE: 'Luke Skywalker'
    },
    MAX_POPULATION: 1000000000000       //Max population. Population of Coruscant.
};

export default Constants;