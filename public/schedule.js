var schedule = angular.module('schedule', ['ngRoute']);

schedule.config(function($routeProvider, $sceProvider, $locationProvider) {
  $sceProvider.enabled(false);
  
  $locationProvider.html5Mode(false);
  
  $routeProvider.when('/details/:session', {
    controller: 'DetailsCtrl',
    templateUrl: 'details.html'
  });
  
  $routeProvider.otherwise({controller: 'ScheduleCtrl', controllerAs: 'ctrl', templateUrl: 'schedule.html'});
});

schedule.factory('data', function($http, $q){
  
  return {
    fetch: function(key){
      var deferred = $q.defer();
      
      $http.get('schedule-built.json').then(function(res){
        var session;
        _.forEach(res.data, function(day){
          var match = _.find(day.items, {key: key});
          if(match){
            session = match;
          }
        })
        deferred.resolve(session);
      });
      
      return deferred.promise;
    }
  }
  
})
  
schedule.controller('ScheduleCtrl', function($http) {
  // $http.get('schedule.json')
  $http.get('schedule-built.json')
    .then(function(schedule) {
      this.schedule = schedule.data;
    }.bind(this));
});

schedule.controller('DetailsCtrl', function(data, $routeParams, $scope){
  data.fetch($routeParams.session).then(function(session){
    $scope.session = session;
  });
  
})
