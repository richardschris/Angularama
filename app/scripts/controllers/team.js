'use strict';

/**
 * @ngdoc function
 * @name angularamaApp.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the angularamaApp
 */
angular.module('angularamaApp')
  .controller('TeamCtrl', function (teamSchedule, TeamWeek) {
      this.getSchedule = function(team) {
          return teamSchedule.getTeam(team);
      };

      this.sched = this.getSchedule(TeamWeek.getTeam());

      this.teams = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN',
        'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAC', 'KC',
        'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'OAK', 'PHI', 'PIT',
        'SD', 'SEA', 'SF', 'STL', 'TB', 'TEN', 'WAS'];

        this.weekTransition = function(week) {
            TeamWeek.setWeek(week);
        };

        this.teamTransition = function(team) {
            TeamWeek.setTeam(team);
            this.sched = this.getSchedule(TeamWeek.getTeam());
        };
}).factory('teamSchedule', function ($http) {
    var teamScheduleInstance = {};

    teamScheduleInstance.getTeam = function(team) {
        var _response = {};

        $http.get('http://localhost:5000/schedule/team/'+team)
            .then(function(response) {
                _response.content = response.data;
            });

        return _response;
    };

    return teamScheduleInstance;
});
