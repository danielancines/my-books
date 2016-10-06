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

  newBook.$inject = ['$http', '$location', 'toastr'];
  function newBook($http, $location, toastr){
    var vm = this;
    vm.coverUrl = "/images/BookCover.jpeg";
    vm.isbn = "1476727651";
    vm.title = "";
    vm.description = "";

    vm.save = function(newBook){
      $http({
        method: 'POST',
        url: 'http://localhost:7203/books',
        data: {title: newBook.title, ibsn: newBook.isbn, description: newBook.description, coverUrl: newBook.bookCoverUrl}
      }).then(function (data){
        vm.books = data.data;
        toastr.success("Book saved!", "Success");
        $location.path('/');
      });
    };

    vm.searchBookByIsbn = function(){
      $http({
        method: 'GET',
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + vm.isbn
      }).then(function (data){
        vm.coverUrl = data.data.items[0].volumeInfo.imageLinks.thumbnail;
        vm.title = data.data.items[0].volumeInfo.title;
        vm.description = data.data.items[0].volumeInfo.description;
      });
    };
  }
})();
