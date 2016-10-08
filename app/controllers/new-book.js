(function(){
  'use strict';

  angular.module('myBooksApp.books')
  .config(['$routeProvider', route])
  .controller('NewBookController',newBook);

  function route($routeProvider){
    $routeProvider.when('/new-book/:id', {
      templateUrl: 'views/new-book.html',
      controller: 'NewBookController',
      controllerAs: 'NewBookCtrl'
    }).when('/new-book', {
      templateUrl: 'views/new-book.html',
      controller: 'NewBookController',
      controllerAs: 'NewBookCtrl'
    });
  }

  newBook.$inject = ['$location', '$routeParams', 'toastr', 'booksService', 'config', 'uuid4'];
  function newBook($location, $routeParams, toastr, booksService, config, guid){
    var vm = this;
    vm.editMode = false;
    vm.buttonTitle = "Save";
    vm.book = {
      coverUrl: config.defaultBookCover
    };

    if ($routeParams.id != null){
      vm.editMode = true;
      vm.buttonTitle = "Update";
      booksService.getBookById($routeParams.id)
      .then(getBookCompleted);

      function getBookCompleted(book){
        vm.book = book;
      };
    }

    vm.save = function(book){
      var newBook = {
        coverUrl: book.coverUrl,
        description: book.description,
        id: guid.generate(),
        isbn: book.isbn,
        title: book.title
      };

      console.log(newBook);
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
      if (vm.book.isbn == ""){
        return;
      }

      booksService.searchBookByIsbn(vm.book.isbn)
        .then(searchBookByIsbnCompleted);

      function searchBookByIsbnCompleted(book){
        if (book == null){
          toastr.info('Book not found');
          return;
        }

        vm.book.coverUrl = book.thumbnail;
        vm.book.title = book.title;
        vm.book.description = book.description;
      }
    };
  }
})();
