'use strict';

angular.module('myApp.firebaseService', ['firebase'])

.factory('firebaseService', ['$firebaseArray','$firebaseObject',function($firebaseArray, $firebaseObject) {


    var _service = {};

        var ref = new Firebase("https://flickering-torch-2275.firebaseio.com/orders");
        ref.authAnonymously(function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        })

        _service.orders = $firebaseArray(ref);

        _service.orders.create = function(order) {
            console.log(angular.toJson(order));
            return _service.orders.$add(order);
        };

        _service.orders.getById = function(orderId) {
            console.log(angular.toJson(orderId));
            return $firebaseObject(ref.child(orderId))
        };

        _service.orders.update = function(order) {
            return order.$save();
        };

        //Generates Order Id
        _service.generateOrderId = function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };

        return _service;
}]);