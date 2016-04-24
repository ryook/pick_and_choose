angular.module('pacs')
  .controller('Controller', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.title = "SFCらしさ"

    $scope.images = images;

    cnt = 0;
    $scope.clk_img = function(obj){
      if(obj.selected == false){
        if(cnt<4){
          cnt += 1;
          images[obj.id-1].selected = true;
        }
      }else{
        cnt -= 1;
        images[obj.id-1].selected = false;
      }
      $scope.cnt = cnt;
    };

    $scope.send = function(){
      if(cnt != 4){
        return
      }
      selected = []
      images.forEach(function(x){
        if(x.selected == true){
          selected.push(x.id);
        };
      });
      faculty = $scope.faculty
      sex = $scope.sex
      type = $scope._type
      if(!sex || !type || !faculty){
        console.log("ただしくない")
      }

      data = {
        'selected':selected,
        'sex': sex,
        'type': type,
        'faculty': faculty
      }
      $http({
          method: 'POST',
          url: '/form',
          params: data
        }).success(function(data){
          // $location.path('/#/end');
          console.log(status)
        }).error(function(data, status){
          console.log(status)
        })

    }
  }])


images = [
  {'url':'iba.jpg', 'id':1, 'selected': false},
  {'url':'jimbo.jpg', 'id':2, 'selected': false},
  {'url':'kaminari.jpg', 'id':3, 'selected': false},
  {'url':'kato.jpg', 'id':4, 'selected': false},
  {'url':'matsukawa.jpg', 'id':5, 'selected': false},
  {'url':'mizuno.jpg', 'id':6, 'selected': false},
  {'url':'nakayama.jpg', 'id':7, 'selected': false},
  {'url':'shimizu.jpg', 'id':8, 'selected': false},
  {'url':'wakita.jpg', 'id':9, 'selected': false},
]
