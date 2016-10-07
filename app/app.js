(function() {
  'use strict';
  angular.module('myBooksApp',[
    'ngRoute',
    'toastr',
    'ngAnimate',
    'myBooksApp.books',
    'myBooksApp.services'
  ])
  .config(['$locationProvider', '$routeProvider', Routes]);

  function Routes($locationProvider, $routeProvider, $httpProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/404'});
  }
})();
