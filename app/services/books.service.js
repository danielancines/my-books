(function(){
  'use strict';

  angular.module('myBooksApp.services', ['ng'])
  .factory('booksService', booksService);

  booksService.$inject = ['$http'];
  function booksService($http){
    var service = {
      getBooks: getBooks,
      postBook: postBook,
      searchBookByIsbn: searchBookByIsbn
    };

    return service;

    function getBooks(){
      return $http({
        method: 'GET',
        url: '/books'
      }).then(getBooksCompleted)
        .catch(getBooksError);

      function getBooksCompleted(data, status, headers, config){
        return data.data;
      }

      function getBooksError(message){
        return message;
      }
    }

    function postBook(newBook){
      return $http({
        method: 'POST',
        url: '/books',
        data: {title: newBook.title, ibsn: newBook.isbn, description: newBook.description, coverUrl: newBook.bookCoverUrl}
      }).then(postBookCompleted)
        .catch(postBookError);

      function postBookCompleted(data){
        return data.status;
      }

      function postBookError(message){
        return message.status;
      }
    }

    function searchBookByIsbn(isbn){
      return $http({
        method: 'GET',
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn
      }).then(searchBookByIsbnCompleted)
        .catch(searchBookByIsbnError);

      function searchBookByIsbnCompleted(data){
        var book = {};
        if (data.data.totalItems >= 1){
          book.thumbnail = data.data.items[0].volumeInfo.imageLinks.thumbnail;
          book.title = data.data.items[0].volumeInfo.title;
          book.description = data.data.items[0].volumeInfo.description;
        }

        return book;
      }

      function searchBookByIsbnError(data){
        return data.status;
      }
    }
  }
})();
