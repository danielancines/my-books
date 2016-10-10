(function(){
  'use strict';

  angular.module('myBooksApp.statistics', ['chart.js'])
  .config(['$routeProvider', route])
  .controller('StatisticsController', statistics);

  function route($routeProvider){
    $routeProvider.when('/statistics', {
      templateUrl: 'views/statistics.html',
      controller: 'StatisticsController',
      controllerAs: 'StatisticsCtrl'
    });
  }
  
  statistics.$inject = ['booksService'];
  function statistics(booksService){
    var vm = this;
    vm.options = {
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    stepSize: 1
                }
            }]
        }
    };

    vm.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec' ];

    booksService.getBooksStatistics(2016)
    .then(getBooksStatisticsCompleted);

    function getBooksStatisticsCompleted(data){
        vm.data = data;
    };
  }
})();
