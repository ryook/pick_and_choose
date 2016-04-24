angular.module('pac')
  .controller('AdminController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.title = "pick and choose";

    $http({
        method: 'GET',
        url: '/research'
      }).success(function(data){
        $scope.researches = data
      }).error(function(data, status){
        console.log(status)
    })

    $scope.add = function(){
      console.log('add')
      $location.path('/admin/form/0')
    };

    $scope.edit = function(id){
      UrlPath = 'admin/form/' + id
      $location.path(UrlPath)
    }

  }])
