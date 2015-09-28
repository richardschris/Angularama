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
        'ngTouch',
        'FullTeamNameFilter'
    ])
    .config(function($routeProvider) {
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
            .when('/week', {
                templateUrl: 'views/week.html',
                controller: 'WeekScheduleCtrl',
                controllerAs: 'week'
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
        var team = 'ARI'; // go Cards!

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
   });

   angular.module('FullTeamNameFilter', [])
   .filter('TeamName', function() {
      return function(input) {
        var teamsAbbrev = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN',
            'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAC', 'KC',
            'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'OAK', 'PHI', 'PIT',
            'SD', 'SEA', 'SF', 'STL', 'TB', 'TEN', 'WAS'];

        var teamsFull = ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina',
                'Chicago', 'Cincinnati', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Green Bay', 'Houston', 'Indianapolis', 'Jacksonville', 'Kansas City', 'Miami', 'Minnesota', 'New England', 'New Orleans', 'New York Giants', 'New York Jets', 'Oakland', 'Philadelphia',
                'Pittsburgh', 'San Diego', 'Seattle', 'San Francisco', 'St.                Louis','Tampa Bay', 'Tennessee', 'Washington'];

        input = teamsAbbrev.indexOf(input);
        return teamsFull[input];
    };
   });
