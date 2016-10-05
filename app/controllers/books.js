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
    vm.books.push({
      title: "The Lord of the Rings: ",
      description: "In ancient ting it with his own power so that he could rule all others.",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/51eq24cRtRL._SX331_BO1,204,203,200_.jpg"
    });
    for (var i = 0; i < 20; i++) {
      vm.books.push({
        title: "The Lord of the Rings: 50th Anniversary, One Vol. Edition",
        description: "In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others.",
        thumbnail: "https://images-na.ssl-images-amazon.com/images/I/51eq24cRtRL._SX331_BO1,204,203,200_.jpg"
      });
    }

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
