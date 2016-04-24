angular.module('pac')
  .controller('TopController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.title = "pick and choose";
    $scope.researches = ["ほげ", "ほげ2"];

  }])
