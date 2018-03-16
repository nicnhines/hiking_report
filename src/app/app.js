import angular from 'angular';
import ngRoute from 'angular-route';
import TrailCtrl from '../public/controller/trail.controller'


import '../style/app.css';

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}


const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [ngRoute])
  .controller('AppCtrl', AppCtrl)
  .controller('TrailCtrl', TrailCtrl)
  .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $routeProvider
      .when(`/`, {
        templateUrl: 'views/app.html',
        controller: 'AppCtrl'
      })
      .when(`/trail`, {
      templateUrl: `views/trail.html`,
      controller: 'TrailCtrl'
      })
    $locationProvider.html5Mode(true);
  }])

export default MODULE_NAME;