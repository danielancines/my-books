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

    vm.save = function(){
      var book = {
        coverUrl: vm.book.coverUrl,
        description: vm.book.description,
        id: vm.book.id || guid.generate(),
        isbn: vm.book.isbn,
        title: vm.book.title
      };

      if (vm.editMode){
        booksService.updateBook(book)
        .then(saveCompleted);
      } else{
        booksService.postBook(book)
        .then(saveCompleted);
      }

      function saveCompleted(result){
        if (result == 200){
          var message = "Book saved!";
          if (vm.editMode){
            message = "Book updated";
          }
          toastr.success(message, "Hooray!!!");
          $location.path('/');
        } else {
          toastr.error("Error Code: " + result);
        }
      }
    };

    vm.searchBookByIsbn = function(){
      if (vm.book.isbn == "" || vm.editMode){
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
