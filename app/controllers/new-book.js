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

  newBook.$inject = ['$location', 'toastr', 'booksService'];
  function newBook($location, toastr, booksService){
    var vm = this;
    vm.coverUrl = "/images/BookCover.jpeg";
    vm.isbn = "1476727651";
    vm.title = "";
    vm.description = "";

    vm.save = function(newBook){
      booksService.postBook(newBook)
      .then(saveCompleted);

      function saveCompleted(result){
        if (result == 200){
          toastr.success("Book saved!", "Hooray!!!");
          $location.path('/');
        } else {
          toastr.error("Error on saving. Code: " + result);
        }
      }
    };

    vm.searchBookByIsbn = function(){
      booksService.searchBookByIsbn(vm.isbn)
        .then(searchBookByIsbnCompleted);

      function searchBookByIsbnCompleted(book){
        vm.coverUrl = book.thumbnail;
        vm.title = book.title;
        vm.description = book.description;
      }
    };
  }
})();
