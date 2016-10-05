(function(){
  'use strict';

  angular.module('myBooksApp.books')
  .config(['$routeProvider', route])
  .controller('NewBookController',newBook);

  function route($routeProvider){
    $routeProvider.when('/new-book', {
      templateUrl: 'views/new-book.html',
      controller: 'NewBookController',
      controllerAs: 'NewBookCtrl'
    });
  }

  function newBook(){
    var vm = this;
    vm.title = "teste";

    vm.save = function(newBook){
      alert(newBook.title + " " + newBook.ibsn + " " + newBook.description);
    };
  }
})();
