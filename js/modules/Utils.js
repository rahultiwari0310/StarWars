import Constants from 'modules/Constants';
import $ from 'jquery';

const Utils = {

    log( message ) {
        if ( Constants.DEBUG_MODE ) {
            window.console.log( message );
        }
    },

    /**
     * Used to check if the value provided evaluates to true.
     * @param value
     * @returns {boolean}
     */
    isTrue( value ) {
        return null !== value && 'undefined' !== typeof value && 'true' === value.toString();
    },

    /**
     * Ajax request utility.
     */
    ajax: $.ajax,

   isUndefined( value ) {
        return null === value || 'undefined' === typeof value || 'null' === value;
    },

    /**
     * creates url params
     */
    addGetParameters ( url, parameters ) {
        return url + ( ( url.search( /\?/ ) === -1 ? '?' : '&' ) + parameters );
    }
};

export default Utils;