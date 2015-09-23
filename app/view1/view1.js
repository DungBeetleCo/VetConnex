'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.firebaseService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        })
      .when('/view1/:orderId', {
          templateUrl: 'view1/view1.html',
          controller: 'View1Ctrl'
      });
}])

.controller('View1Ctrl', ['$scope','gisService','firebaseService', '$routeParams', function($scope, gisService, firebaseService, $routeParams) {

        //Dropdown Selection Data
        $scope.countries = [];

        //Get orderId as route parameter
        $scope.newOrder = {
            "status" : "new",
            "submitted" : new Date(),
            "applicant" : {
                "alias" : {
                    "first" : "Terence",
                    "last" : "Matthew",
                    "middle" : "Miranda"
                },
                "citizenCountry" : "US",
                "dateOfBirth" : new Date("January 12, 1987"),
                "eyeColor" : "BLK",
                "hairColor" : "BLK",
                "height" : {
                    "feet" : 5,
                    "inches" : 11
                },
                "isUsCitizen" : true,
                "name" : {
                    "first" : "Terry",
                    "last" : "Miranda",
                    "middle" : "Boomer"
                },
                "placeOfBirth" : "US",
                "race" : "A",
                "residentCountry" : "US",
                "ssn" : "454-45-5645",
                "weight" : 180
            }};

        //$scope.orderId = angular.isUndefined($routeParams.orderId)? null: $routeParams.orderId;
        //$scope.existingOrder = $scope.orderId != null? firebaseService.orders.getById($scope.orderId) : null;
        $scope.order =  {};
        $scope.applicant = {};

        $scope.createOrder = function() {
            firebaseService.orders.create($scope.order).then(function(response){
                $scope.order = response;
            });
        };

        $scope.load = function(){
                //load Countries dataSet
             gisService.getCountries().then(function(d){
                 //console.log(angular.toJson(d));
                 $scope.countries = d;

            });

            var orderId = angular.isUndefined($routeParams.orderId)? null: $routeParams.orderId;

            firebaseService.orders.getById(orderId).$loaded().then(function(existingOrder){

                if(existingOrder != null)
                    $scope.order = existingOrder;
                else
                    $scope.order = $scope.newOrder;

                $scope.applicant = $scope.order.applicant;
            })
     };
        $scope.load();
}]);