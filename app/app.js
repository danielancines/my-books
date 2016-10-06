(function() {
  'use strict';
  angular.module('myBooksApp',[
    'ngRoute',
    'toastr',
    'ngAnimate',
    'myBooksApp.books'
  ])
  .config(['$locationProvider', '$routeProvider', '$httpProvider', Routes]);

  function Routes($locationProvider, $routeProvider, $httpProvider){
    $routeProvider.otherwise({redirectTo: '/404'});
  }
})();
