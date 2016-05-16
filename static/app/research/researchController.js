angular.module('pac')
  .controller('ResearchController', ['$scope', '$http', '$location', '$routeParams',
   function ($scope, $http, $location, $routeParams) {
    $scope.selceting = true
    id = $routeParams.researchId
    $http({
        method: 'GET',
        url: '/research/' + 1
      }).success(function(data){
        $scope.data = data
        set_question()
      }).error(function(data, status){
        console.log(status)
    })

    // answer1
    set_question = function(){
      $scope.question = $scope.data.question
      const imageNum = $scope.data.imageCount
      const imagePath = $scope.data.image_path
      var images = [];
      for(var i=1;i<=imageNum;i++){
        obj = {};
        obj['url'] = imagePath + i + '.jpg';
        obj['id'] = i;
        obj['selected'] = false;
        images.push(obj)
      }
      $scope.imageList = images;
    }

    $scope.clk_img = function(obj){
      if(obj.selected == false){
        $scope.imageList[obj.id-1].selected = true;
      }else{
        $scope.imageList[obj.id-1].selected = false;
      }
    };

    $scope.click_nxtbtn = function(){
      $scope.selceting = false;
    }

    $scope.click_backbtn = function(){
      $scope.selceting = true;
    }

    // answer2
    $scope.sexs = ["男性", '女性', 'その他']

    ageList = new Array(56);
    ageList[0] = '14際以下';
    for(var i=1;i<56;i++){
      ageList[i] = i+14;
    }
    ageList[56] = '70歳以上';
    $scope.ages = ageList;
    // TODO: 削除
    $scope.age = 0

    $scope.aq = []
    $scope.save = function(sex, age, aq, free){
      data = {};
      data['sex'] = sex;
      data['age'] = age;
      data['free'] = free;
      for(var i=0,len=aq.length;i<len;i++){
        q = 'q'+(i+1);
        data[q] = aq[i];
      };
      images = [];
      for(var i=0,len=$scope.imageList.length;i<len;i++){
        if($scope.imageList[i].selected == true){
          images.push(1);
        }else{
          images.push(0);
        };
      };
      data['selected'] = images;

      $http({
          method: 'POST',
          url: '/answers',
          params: data
        }).success(function(data){
          $location.path('/end')
        }).error(function(data, status){
          console.log(status)
          $location.path('/end')
      });
    };

}]);
