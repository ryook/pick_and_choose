angular.module('SfcKickOff')
  .controller('ResultController', ['$scope', '$http', function ($scope, $http) {
    $scope.teachers = teachers
    var _data,_ldata,_rdata;
    $http({
        method: 'GET',
        url: '/result',
      }).success(function(data){
        // $scope._data = data;
        _data = data;
        _rdata = data;
        _ldata  = data;
        $scope._datal = data;
        $scope._datar = _rdata;
        $scope.sort_type = 'all_cnt';
        $scope.left_label = 'all';
        $scope.right_label = 'all';
      }).error(function(data, status){
        console.log(status)
    });

    $scope.sort = function(type){
       $scope.sort_type = type;
       if(type == "s0"){
           _ldata.sort(function(c,d){
             if(c.s0>d.s0) return -1;
             if(c.s0 < d.s0) return 1;
             return 0;
           });
           $scope._datal = _ldata;
           $scope.left_label = '男';
         }else if(type == "s1"){
           _ldata.sort(function(c,d){
             if(c.s1>d.s1) return -1;
             if(c.s1 < d.s1) return 1;
             return 0;
           });
           $scope._datal = _ldata;
           $scope.left_label = '女';
         }else if(type == "f0"){
           _ldata.sort(function(c,d){
             if(c.f0>d.f0) return -1;
             if(c.f0 < d.f0) return 1;
             return 0;
           });
           $scope._datal = _ldata;
           $scope.left_label = '総合政策';
         }else if(type == "f1"){
           _ldata.sort(function(c,d){
             if(c.f1>d.f1) return -1;
             if(c.f1 < d.f1) return 1;
             return 0;
           });
           $scope._datal = _ldata;
           $scope.left_label = '環境情報';
         }else if(type == "u0"){
           _ldata.sort(function(c,d){
             if(c.u0>d.u0) return -1;
             if(c.u0 < d.u0) return 1;
             return 0;
           });
           $scope._datal = _ldata;
           $scope.left_label = '大人気分';
         }else if(type == "u1"){
           _ldata.sort(function(c,d){
             if(c.u1>d.u1) return -1;
             if(c.u1 < d.u1) return 1;
             return 0;
           });
           $scope._datal = _ldata;
           $scope.left_label = '子供気分';
         }else {
           _ldata.sort(function(c,d){
             if(c.all_cnt>d.all_cnt) return -1;
             if(c.all_cnt < d.all_cnt) return 1;
             return 0;
           });
           $scope._datal = _ldata;
           $scope.left_label = 'all';
         }
    }
    //
    //  else if (type == "f0") {
    //     $scope._datal.sort(function(a,b){
    //       if(a.f0>b.f0) return -1;
    //       if(a.f0 < b.f0) return 1;
    //       return 0;
    //     });
    //     $scope.left_label = '総合政策';
    //   }else if (type == 'f1') {
    //     $scope._datar.sort(function(a,b){
    //       if(a.f1>b.f1) return -1;
    //       if(a.f1 < b.f1) return 1;
    //       return 0;
    //     });
    //     $scope.left_label = '環境情報';
    //   }else if (type == 't0') {
    //     _ldata.sort(function(a,b){
    //       if(a.u0>b.u0) return -1;
    //       if(a.u0 < b.u0) return 1;
    //       return 0;
    //     });
    //     $scope._datal = datal;
    //     $scope.left_label = '大人気分';
    //   }else if (type == 't1') {
    //     _rdata.sort(function(a,b){
    //       if(a.u1>b.u1) return -1;
    //       if(a.u1 < b.u1) return 1;
    //       return 0;
    //     });
    //     $scope._datar = datar;
    //       $scope.left_label = '子供気分';
    //   }else{
    //     $scope._datal = _ldata;
    //     $scope._datar = _rdata;
    //     $scope.left_label = 'all';
    //     $scope.right_label = 'all';
    //   };
    //   console.log(datal)
    //   console.log(datar)
    // }


  }])

teachers = {
  1: {'url': 'iba.jpg', 'name': '井庭 崇',
      'study': 'パターン・ランゲージ, 創造性, 社会システム理論', 'lecture': 'パターンランゲージ, 創造社会論'},
  2: {'url': 'jimbo.jpg', 'name': '神保 謙', 'study': '安全保障論', 'lecture': ' 安全保障と国際紛争'},
  3: {'url': 'kaminari.jpg', 'name': '神成　淳司', 'study': '情報政策, 医療政策, 農業情報科学', 'lecture': '未来構想ワークショップ'},
  4: {'url': 'kato.jpg', 'name': '加藤 貴昭', 'study': '人間工学, スポーツ心理学', 'lecture': '脳と行動'},
  5: {'url': 'matsukawa.jpg', 'name': '松川 昌平', 'study': '建築設計, アルゴミック・デザイン', 'lecture': 'デジタルデザイン基礎'},
  6: {'url': 'mizuno.jpg', 'name': '水野 大二郎',
      'study': 'ファッションデザインの実践と批評, デザインリサーチ', 'lecture': 'ファッションデザイン'},
  7: {'url': 'nakayama.jpg', 'name': '中山 俊宏', 'study': 'アメリカ政治・外交、日米関係、国際政治', 'lecture': 'グローバルガバナンス'},
  8: {'url': 'shimizu.jpg', 'name': '清水 唯一郎',
  　　 'study': '日本政治外交史, オーラルヒストリー', 'lecture': 'オーラルヒストリーワークショップ'},
  9: {'url': 'wakita.jpg', 'name': '脇田 玲',
      'study': 'ビジュアライゼーション・形状モデリング', 'lecture': 'グラフィックスプログラミング'},
}
