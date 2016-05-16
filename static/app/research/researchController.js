angular.module('pac')
  .controller('ResearchController', ['$scope', '$http', '$location', '$routeParams',
   function ($scope, $http, $location, $routeParams) {
    $scope.selceting = true
    $scope.curr_count = 0
    id = $routeParams.researchId
    $scope.searchId = id
    $http({
        method: 'GET',
        url: '/research/' + id
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
      $scope.limit = $scope.data.limit
      $scope.FA = $scope.data.FA
      $scope.FATitle = $scope.data.FATitle
      var images = [];
      var showImages = [];
      for(var i=1;i<=imageNum;i++){
        obj = {};
        obj['url'] = imagePath + i + '.jpg';
        obj['id'] = i;
        obj['selected'] = false;
        images.push(obj)
        showImages.push(obj)
      }
      $scope.imageList = images;
      $scope.showImages = shuffle(showImages)
    }

    var shuffle = function(list) {
      var i = list.length;

      while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        if (i == j) continue;
        var k = list[i];
        list[i] = list[j];
        list[j] = k;
      }
      return list;
    };

    $scope.clk_img = function(obj){
      if(obj.selected == false){
        if($scope.curr_count < $scope.limit){
          $scope.imageList[obj.id-1].selected = true;
          $scope.curr_count += 1
          console.log($scope.imageList)
        };
      }else{
        $scope.imageList[obj.id-1].selected = false;
        $scope.curr_count -= 1
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
      data['searchId'] = $scope.searchId
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
