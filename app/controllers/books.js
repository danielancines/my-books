(function(){
  'use strict';

  angular.module('myBooksApp.books')
  .config(['$routeProvider', route])
  .controller('BooksController',books);

  function route($routeProvider){
    $routeProvider.when('/', {
      templateUrl: 'views/books.html',
      controller: 'BooksController',
      controllerAs: 'BooksCtrl'
    });
  }

  books.$inject = ['$location', 'booksService'];
  function books($location, booksService){
    var vm = this;
    vm.books = [];

    booksService.getBooks()
    .then(getBooksCompleted);

    function getBooksCompleted(books){
      vm.books = books;
    }

    vm.editBook = function(id){
      $location.path('/new-book/' + id);
    };
  }
})();
