'use strict';

angular.module('myApp.gisService', [])

.factory('gisService', ['$http','$q', function($http, $q) {

    var gisService = {};

        gisService.countryList = [];

        //Gets the list of countries
        gisService.getCountries = function() {

            if(gisService.countryList.length == 0) {
                var promise = $http.get('https://restcountries.eu/rest/v1/all').then(function (response) {
                    gisService.countryList = response.data;
                    return gisService.countryList;
                });

                return promise;
            }

            return gisService.countryList;
        };

        return gisService;
}]);