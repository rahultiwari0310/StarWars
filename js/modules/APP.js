import $ from 'jquery';
import Constants from 'modules/Constants';
import Utils from 'modules/Utils';
import LoginController from 'controllers/LoginController';

const APP = {

    Constants: Constants,

    Utils: Utils

};

const init = () => {

    //Load login controller.
    LoginController.load();
};

$( document ).ready( init );

export default APP;