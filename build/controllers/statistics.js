!function(){"use strict";function t(t){t.when("/statistics",{templateUrl:"views/statistics.html",controller:"StatisticsController",controllerAs:"StatisticsCtrl"})}function s(t){function s(t){i.data=t}var i=this;i.options={scales:{yAxes:[{ticks:{min:0,stepSize:1}}]}},i.labels=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],t.getBooksStatistics(2016).then(s)}angular.module("myBooksApp.statistics",["chart.js"]).config(["$routeProvider",t]).controller("StatisticsController",s),s.$inject=["booksService"]}();