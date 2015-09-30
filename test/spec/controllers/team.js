'use strict';

describe('Controller: TeamCtrl', function () {

  // load the controller's module
  beforeEach(module('angularamaApp'));

  var TeamCtrl,
    scope,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $http) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    httpBackend.when("GET", "http://localhost:5000/schedule/team/ARI").respond([{hello: 'world'}]);
    TeamCtrl = $controller('TeamCtrl', {
      $scope: scope,
      // place here mocked dependencies
      $http: $http
    });
  }));
  // we use some syntactic sugar to do this
  it('should attach a list of teams to the scope', function () {
    expect(TeamCtrl.teams.length).toBe(32);
  });

  it('should fetch Arizona schedule', function () {
    httpBackend.expectGET('http://localhost:5000/schedule/team/ARI');
    httpBackend.flush();
  });
});
