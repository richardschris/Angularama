'use strict';

describe('Controller: WeekScheduleCtrl', function () {

  // load the controller's module
  beforeEach(module('angularamaApp'));

  var schedule,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $http, $httpBackend) {
    httpBackend = $httpBackend;
    httpBackend.when("GET", "http://localhost:5000/schedule/week/1").respond([{hello: 'world'}]);

    schedule = $controller('WeekScheduleCtrl', {
      // place here mocked dependencies
      $http: $http
    });
  }));

  it('should get from the REST API', function () {
    httpBackend.expectGET('http://localhost:5000/schedule/week/1');
    httpBackend.flush();
  });
});
