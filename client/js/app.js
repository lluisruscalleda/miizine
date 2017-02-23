// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngFlash',
    'ui.select',
    'ngSanitize'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider,
                                                                                  $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('zine', {
        url: '/zine',
        templateUrl: 'views/zines/zines.html',
        controller: 'ZineController',
        authenticate: true
      });

    $urlRouterProvider.otherwise('zine');
  }])
  .run(function ($state) {
    $state.go('zine'); //make a transition to movies state when app starts
  });
