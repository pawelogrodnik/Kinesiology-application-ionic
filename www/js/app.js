// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.backButton.text('Powrót');
    $ionicConfigProvider.backButton.previousTitleText(false);
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home',{
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('tabs.kontakt',{
      url: '/kontakt',
      views: {
        'kontakt-tab' : {
          templateUrl: 'templates/kontakt.html'
        }
      }
    })

    .state('tabs.list',{
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/lista.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.encyklopedia',{
      url: '/encyklopedia',
      views: {
        'encyklopedia-tab' : {
          templateUrl: 'templates/encyklopedia.html',
          controller: 'EncyklopediaController'
        }
      }
    })

    .state('tabs.detailen', {
      url: '/encyklopedia/:aId',
      views: {
        'encyklopedia-tab' : {
          templateUrl: 'templates/detailen.html',
          controller: 'EncyklopediaController'
        }
      }
    })


    $urlRouterProvider.otherwise('/tab/home');
    }
  )

.controller('ListController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $http.get('js/data-test.json').success(function(data) {
      $scope.kinesio = data.kinesio;
      $scope.whichkinesio = $state.params.aId;
    })
}])

.controller('EncyklopediaController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $http.get('js/data-test.json').success(function(data) {
      $scope.encyklopedia = data.encyklopedia;
      $scope.whichencyklop = $state.params.aId;
    })
}])
