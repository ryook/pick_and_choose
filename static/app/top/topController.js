angular.module('pac')
  .controller('TopController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.title = "pick and choose";

    $http({
        method: 'GET',
        url: '/research'
      }).success(function(data){
        $scope.researches = data
      }).error(function(data, status){
        console.log(status)
    })

  }])
