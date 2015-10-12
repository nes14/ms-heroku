'use strict';

angular.module('MortgageSaver')
.controller('LeaderboardCtrl', function ($scope, $stateParams) {
	window.leaderboard = $scope;
	console.log('inside LeaderboardCtrl');
  $scope.players = [
    { title: 'Jim', score: '5000', avatar: 'img/avatars/jim.jpg', id: 1 },
    { title: 'Fred', score: '3250', avatar: 'img/avatars/fred.jpg', id: 2 },
    { title: 'George', score: '2085', avatar: 'img/avatars/george.jpg', id: 3 },
    { title: 'Sam', score: '1000', avatar: 'img/avatars/sam.jpg', id: 4 },
    { title: 'Bill', score: '750', avatar: 'img/avatars/bill.jpg', id: 5 },
    { title: 'Bruce', score: '100', avatar: 'img/avatars/bruce.jpg', id: 6 }
  ];
  console.log('$scope.players', $scope.players);
});