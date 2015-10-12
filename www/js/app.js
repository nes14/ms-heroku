'use strict';
// debugger;
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('MortgageSaver', ['ionic', 'angularMoment', 'googlechart', 'ngRoute', 'ngAnimate'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      console.log('statusbar', StatusBar);
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      StatusBar.hide();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.what-if', {
    url: '/what-if',
    views: {
      'menuContent': {
        templateUrl: 'templates/what-if.html',
        controller: 'CalcCtrl'
      }
    }
  })

  .state('app.do-it', {
      url: '/do-it',
      views: {
        'menuContent': {
          templateUrl: 'templates/do-it.html'
        }
      }
    })

  .state('app.leaderboard', {
      url: '/landing/leaderboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/leaderboard.html',
          controller: 'LeaderboardCtrl'
        }
      }
    })

  .state('app.rewards', {
      url: '/landing/rewards',
      views: {
        'menuContent': {
          templateUrl: 'templates/rewards.html',
          controller: 'LeaderboardCtrl'
        }
      }
    })

  .state('app.landing', {
    url: '/landing',
    views: {
      'menuContent': {
        templateUrl: 'templates/landing.html',
        controller: 'LandingCtrl'
      }
    }
  })

  // .state('app.login', {
  //   url: '/login',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/login.html',
  //       controller: 'AppCtrl'
  //     }
  //   }
  // })

  .state('app.player', {
    url: '/leaderboard/:playersId',
    views: {
      'menuContent': {
        templateUrl: 'templates/player.html',
        controller: 'LeaderboardCtrl'
      }
    }
  })

  .state('app.show-me-how', {
    url: '/what-if/choose',
    views: {
      'menuContent': {
        templateUrl: 'templates/choose.html',
        controller: 'CalcCtrl'
      }
    }
  })

  .state('app.pool-room', {
    url: '/landing/pool-room',
    views: {
      'menuContent': {
        templateUrl: 'templates/pool-room.html',
        controller: 'PoolCtrl'
      }
    }
  })

  .state('app.add-goal', {
    url: '/what-if/choose/add-goal',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-goal.html',
        controller: 'ChooseCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/landing');
});
