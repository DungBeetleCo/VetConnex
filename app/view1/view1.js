'use strict';

angular.module('myApp.view1', ['ngRoute','myApp.gisService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'gisService','$q', function($scope, gisService,$q) {

        $scope.countries = [];
        $scope.placeOfBirth = 'US';
        $scope.countryOfCitizenship = 'US';
        $scope.countryOfResidence = 'US';

        $scope.load = function(){

            //load Countries dataSet
         gisService.getCountries().then(function(d){
             console.log(angular.toJson(d));
             $scope.countries = d;
         });


     };

        $scope.load();


}]);