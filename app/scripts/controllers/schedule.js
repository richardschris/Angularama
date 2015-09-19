'use strict';

/**
 * @ngdoc function
 * @name angularamaApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the angularamaApp
 */
angular.module('angularamaApp')
    .controller('WeekScheduleCtrl', function(weekSchedule) {
        this.getSchedule = function(week) {
            return weekSchedule.getWeek(week);
        };

        this.defaultWeek = 1;
        this.sched = this.getSchedule(this.defaultWeek);

    })
    .factory('weekSchedule', function($http) {
        var weekSchedInstance = {};

        weekSchedInstance.getWeek = function(week) {
            var _response = {};
            $http.get('http://localhost:5000/schedule/week/'+week)
                .then(function(response)
                {
                    _response.content = response.data;
                });

            return _response;
        };

        return weekSchedInstance;
    });
