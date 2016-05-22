angular.module('pac')
  .controller('AnaController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.sort = 'all'
    $scope.sorts = ['all', 'filter', 'percent']
    $scope.selected_question = []
    $scope.check = []

    $http({
        method: 'GET',
        url: '/research'
      }).success(function(data){
        $scope.researches = data
      }).error(function(data, status){
        console.log(status)
    })

    $scope.selectResearch = function(){
      research = $scope.research;
      if(research){
        console.log(research)
        $scope.title = research.title;
        $scope.research_id = research.id;
        $scope.question = research.question;
        $scope.questions = research.questions;

        $http({
            method: 'POST',
            url: '/analytics',
            params: research
          }).success(function(data){
            $scope.count = data.count;
            console.log(data)
            $scope.images_all_cnt = data.images
          }).error(function(data, status){
            console.log(status)
        });

      };
    };

    $scope.get_data = function(){
      params = {}
      params['researchId'] = $scope.research_id
      params['choices'] = $scope.selected_question

      $http({
          method: 'POST',
          url: '/analytics_selected',
          params: params
        }).success(function(data){
          if(data=='None'){
            $scope.filtered_count = 0
            $scope.images_filtered_cnt = 0
          }else{
            $scope.filtered_count = data.count
            $scope.images_filtered_cnt = data.images
          }
          set_show_data($scope.images_all_cnt, $scope.images_filtered_cnt)
        }).error(function(data, status){
          console.log(status)
      });

    }

    $scope.select_question = function(i, d){
      sub = {'q': i + 1, 'c': d}
      if($scope.check.indexOf(d) == -1 ){
        $scope.selected_question.push(sub)
        $scope.check.push(d)
      }else{
        newL = $scope.selected_question.filter(function(v){return v.c != sub.c;});
        $scope.selected_question = newL

        newC = $scope.check.filter(function(v){return v != d;});
        $scope.check = newC
      }
    }

    set_show_data = function(allL, seL){
      rtn = []
      for(var i=0, l=allL.length; i<l; i++){
        sub = {}
        n = Math.round((seL[i].count / allL[i].count) * 100)
        console.log(n)
        if(!n){
          console.log(000)
          n = 0;
        }
        sub['id'] = allL[i].id
        sub['allCount'] =  allL[i].count
        sub['sub_id'] = seL[i].count
        sub['selectedCount'] = seL[i].count
        sub['percent'] = n
        rtn.push(sub)
      }

      rtn.sort(function(a,b){
          if(a.percent > b.percent) return -1;
          if(a.percent < b.percent) return 1;
          return 0;
      });
      for(var i=0, l=rtn.length; i<l; i++){
        rtn[i]['rank'] = i + 1
      }
      $scope.show_data = rtn

    }

    $scope.showDetail = function(d){
      console.log(d)
      $scope.detail = d
    }
  }])
