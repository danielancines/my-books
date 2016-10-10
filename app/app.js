(function() {
  'use strict';
  angular.module('myBooksApp',[
    'ngRoute',
    'toastr',
    'uuid',
    'ngAnimate',
    'myBooksApp.config',
    'myBooksApp.books',
    'myBooksApp.services',
    'myBooksApp.statistics'
  ])
  .config(['$locationProvider', '$routeProvider', Routes]);

  function Routes($locationProvider, $routeProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/404'});
  }
})();
