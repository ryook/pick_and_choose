angular.module('pac')
  .controller('AdminFormController', ['$scope', '$http', '$location', '$routeParams',
   function ($scope, $http, $location, $routeParams) {
     var id = $routeParams.researchId;
     if(id != 0){
       requestUrl = '/research/' + id
       $http({
           method: 'GET',
           url: requestUrl
         }).success(function(data){
           $scope.title = data.title;
           $scope.description = data.description;
           $scope.image = data.image_path;
           $scope.imageCount = data.imageCount;
           $scope.limit = data.limit;
           $scope.question = data.question;
           if(data.FA == 'true'){
             $scope.FA = true;
           }else {
             $scope.FA = false;
           }

           $scope.FATitle = data.FATitle
           data.questions.forEach(function(d){
             d.choices = d.choices.join('\n')
           })
           $scope.addquestions = data.questions
         }).error(function(data, status){
           $location.path('/admin')
       })
     }

    $scope.sex = "男性&#13;&#10;女性&#13;&#10;その他"
    $scope.addquestions = [{"id":1, "title":"", "choices":""}]

    $scope.add = function(){
      n = $scope.addquestions.length;
      $scope.addquestions.push({"id":n+1, "title":"", "choices":""});
    };

    $scope.delete = function(id){
      console.log(add)
    }

    $scope.save = function(){
      query = {}
      query.title = $scope.title;
      query.description = $scope.description;
      query.imageUrl = $scope.image;
      query.questions = $scope.addquestions;
      query.imageCount = $scope.imageCount;
      query.question = $scope.question;
      query.limit = $scope.limit;
      query.FA = $scope.FA
      query.FATitle = $scope.FATitle
      requestUrl = '/research/' + id;

      $http({
          method: 'POST',
          url: requestUrl,
          params: query
        }).success(function(data){
          $location.path('/admin')
        }).error(function(data, status){
          console.log(status)
      });

    }

  }])
