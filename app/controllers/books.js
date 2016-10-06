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

  function books($http){
    var vm = this;
    vm.isbn = "";
    vm.books = [];

    $http({
      method: 'GET',
      url: 'http://ybooks.azurewebsites.net/books'
    }).then(function (data){
      vm.books = data.data;
    });

    vm.loadImage = function(){
      $http({
        method:'GET',
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + vm.isbn,
      }).then(loadImageComplete);
    };

    function loadImageComplete(data){
      alert(data.data.items[0].volumeInfo.imageLinks);
      vm.books.push({
        title:data.data.items[0].volumeInfo.title,
        image: data.data.items[0].volumeInfo.imageLinks.thumbnail,
        description: data.data.items[0].volumeInfo.description
      });
    }
  }


})();
