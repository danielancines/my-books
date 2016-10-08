(function(){
  'use strict';

  var config = angular.module('myBooksApp.config', [])
              .config(toastrConfig);

  toastrConfig.$inject = ['toastrConfig'];
  function toastrConfig(toastrConfig){
    toastrConfig.timeOut = 4000;
    toastrConfig.positionClass = 'toast-bottom-right';
    toastrConfig.closeButton= true;
  };

  var parameters = {
    googleApiUrl: 'https://www.googleapis.com/books/v1/volumes?q=isbn:',
    defaultBookCover: '/images/BookCover.jpeg'
  };

  config.value('config', parameters);
})();
