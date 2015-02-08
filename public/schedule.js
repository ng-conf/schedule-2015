var schedule = angular.module('schedule', [])
  .config(function($sceProvider) {
    $sceProvider.enabled(false);
  });;
schedule.controller('ScheduleCtrl', function($http) {
  $http.get('schedule.json')
    .then(function(schedule) {
      this.schedule = schedule.data;
    }.bind(this));
});
