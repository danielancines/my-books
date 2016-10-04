(function(){
  'use strict';

  angular.module('myBooksApp.books')
  .config(['$routeProvider', route])
  .controller('Books',books);

  function route($routeProvider){
    $routeProvider.when('/', {
      templateUrl: 'views/books.html',
      controller: 'Books',
      controllerAs: 'BooksCtrl'
    });
  }

  function books($http){
    var vm = this;
    vm.title = 'My Books Everywhere';
    vm.books = [
      {
        title: 'The Dragon Reborn',
        author: 'Robert Jordan',
        isbn: '0812513711',
        review: 'The Wheel weaves as the Wheel wills, and we are only the thread of the Pattern. Moiraine',
        rating: 4,
        genres: { 'non-fiction': true, fantasy: true },
        image: loadImage($http)
      }
    ];
  }

  function loadImage($http){
    $http({
      method:'GET',
      url: 'http://openlibrary.org/api/books?bibkeys=ISBN:0201558025&jscmd=data',
      withCredentials: false,
      headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      }
    }).then(loadImageComplete);
    //
    // $http.get('http://node-cors-server.herokuapp.com/no-cors')
    //   .then(loadImageComplete);
  }

  function loadImageComplete(data){
    alert(data.data.text);
  }
})();
