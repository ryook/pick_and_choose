app = angular.module('pac', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'static/app/top/top.html',
        controller: 'TopController'})
      .when('/research/:researchId', {
        templateUrl: 'static/app/research/top.html',
        controller: 'ResearchController'})
      .when('/research/:researchId/answer', {
        templateUrl: 'static/app/research/answer.html',
        controller: 'ResearchController'})
      .when('/end', {
        templateUrl: 'static/app/research/end.html',
        controller: 'ResearchController'})
      .when('/admin', {
        templateUrl: 'static/app/admin/adminTop.html',
        controller: 'AdminController'})
      .when('/admin/form/:researchId', {
        templateUrl: 'static/app/admin/form.html',
        controller: 'AdminFormController'})
      .otherwise({redirectTo: '/'});
  }]);
