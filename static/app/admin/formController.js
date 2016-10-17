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
           console.log(data)
           $scope.title = data.title;
           $scope.description = data.description;
           $scope.image = data.image_path;
           $scope.imageCount = data.imageCount;
           $scope.limit = data.limit;
           if(data.anyQuestions == null){
             $scope.questions = data.questions;
           }else{
             $scope.anyQuestions = data.anyQuestions;
           };
          //  $scope.anyQuestions = $scope.anyQuestions;
           if(data.FA == 'true'){
             $scope.FA = true;
           }else {
             $scope.FA = false;
           }
           if(data.isShow == 'true'){
             $scope.isShow = true;
           }else {
             $scope.isShow = false;
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
      console.log($scope.isShow)
      query = {}
      query.title = $scope.title;
      query.description = $scope.description;
      query.imageUrl = $scope.image;
      query.questions = $scope.addquestions;
      query.imageCount = $scope.imageCount;
      query.anyQuestions = $scope.anyQuestions;
      query.limit = $scope.limit;
      query.FA = $scope.FA
      query.FATitle = $scope.FATitle
      query.isShow = $scope.isShow
      requestUrl = '/research/' + id;
      console.log(query)

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
