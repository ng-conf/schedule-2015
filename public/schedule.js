var schedule = angular.module('schedule', ['ngRoute']);

schedule.config(function($routeProvider, $sceProvider, $locationProvider) {
  $sceProvider.enabled(false);
  
  $locationProvider.html5Mode(false);
  
  $routeProvider.when('/details/3', {
    controller: 'DetailsCtrl',
    templateUrl: 'details.html'
  });
  
  // $routeProvider.otherwise({controller: 'ScheduleCtrl', template: 'schedule.html'});
  
  
  // $routeProvider.when('/', { templateUrl: '/schedule.html', controller: 'ScheduleCtrl' })
  
    // .when('/details/:session', {
    //   templateUrl: '/details.html',
    //   controller: 'DetailsCtrl'
    // })
    // 
    // .otherwise({
    //   templateUrl: 'add-order.html',
    //   controller: 'AddOrderController'
    // })
    // $routeProvider.when('/', {controller: 'ScheduleCtrl', template: 'schedule.html'});
    // $routeProvider.when('/details', {controller: 'DetailsCtrl', template: 'details.html'});
});
  
  
schedule.controller('ScheduleCtrl', function($http) {
  alert('schedule');
  $http.get('schedule.json')
    .then(function(schedule) {
      this.schedule = schedule.data;
    }.bind(this));
});

schedule.controller('DetailsCtrl', function(){
  alert('details');
})
