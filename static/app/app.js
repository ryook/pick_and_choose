app = angular.module('pac', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'static/app/top/top.html',
        controller: 'TopController'})
      .when('/admin', {
        templateUrl: 'static/app/admin/adminTop.html',
        controller: 'AdminController'})
      .when('/admin/form/:researchId', {
        templateUrl: 'static/app/admin/form.html',
        controller: 'AdminFormController'})
      .otherwise({redirectTo: '/'});
  }]);
