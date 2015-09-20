'use strict';

/**
 * @ngdoc overview
 * @name angularamaApp
 * @description
 * # angularamaApp
 *
 * Main module of the application.
 */
angular
    .module('angularamaApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/schedule', {
                templateUrl: 'views/week.html',
                controller: 'WeekScheduleCtrl',
                controllerAs: 'schedule'
            })
            .when('/team', {
              templateUrl: 'views/team.html',
              controller: 'TeamCtrl',
              controllerAs: 'team'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .service('TeamWeek', function() {
        var week = 1; //default week
        var team = 'ARI' // go Cards!

        return {
           getTeam: function () {
               return team;
           },
           setTeam: function(value) {
               team = value;
           },
           getWeek: function() {
               return week;
           },
           setWeek: function(value) {
               week = value;
           }
       };
    })
