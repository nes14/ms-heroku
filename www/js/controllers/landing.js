'use strict';

angular.module('MortgageSaver')
.controller('LandingCtrl', function ($route, $scope, moment, PlayerConfig, $ionicPopup, $location){

	window.countdown = countdown;
	window.landing = $scope;
	window.player = PlayerConfig;
	console.log('inside LandingCtrl');

	// $scope.users = [];
	$scope.goals 		 		 = PlayerConfig.getSavedGoals();
	$scope.users 				 = PlayerConfig.getUsers();
	$scope.amountArr 		 = PlayerConfig.getMonthlySaving();
	$scope.totalSavings  = $scope.users[0].moneySaved;
	$scope.animate 			 = false;

	console.log('amountArr: ', $scope.amountArr);
	// $scope.$watch('users', function(newValue, oldValue) {
	// 	console.log('oldValue: ', oldValue);
	// 	console.log('newValue: ', newValue);
	// });

	if($scope.totalSavings < $scope.users[0].moneySaved){
		$route.reload();
		console.log('reloaded');
	}

	$scope.startCount = function(){
		console.log('inside startCount');
		$scope.users = PlayerConfig.getUsers();
		$scope.timer = countdown( new Date(2020, 6, 14), function(count) {
			$scope.timeRemaining = count.toString();
			$scope.count = $scope.timeRemaining.split(/, | and/);
			$scope.$apply();
			$scope.toObject();
			// console.log('timeRemaining: ', $scope.timeRemaining);
		});
	};

	$scope.toObject = function(){
		// console.log('$scope.count: ', $scope.count);
		var obj = {};
		
		for (var i = 0; i < $scope.count.length; ++i){
					obj[i] = $scope.count[i];
				return obj;
			}
		};





	$scope.moneySaved = function(array){
		var totalAmount  = 0;

		for(var i in array){
			totalAmount += array[i];
		}

		$scope.monthlySaving = totalAmount;
		console.log('totalAmount: ', totalAmount);
		PlayerConfig.addMonthlySaving(totalAmount);

	};


	$scope.sweep = function() {
		console.log('monthlySaving: ', $scope.monthlySaving);
		var confirmedGoals = PlayerConfig.getGoals(),
			  user 					 = PlayerConfig.getUsers(),
			  coinDrop 			 = new Audio('audio/coin-drop-effect.mp3');
			  // points				 = user[0].points;

		$scope.saved  = user[0].moneySaved + $scope.monthlySaving;
		user[0].moneySaved = $scope.saved;
		PlayerConfig.saveConfirmed(confirmedGoals);
		PlayerConfig.getUsers()[0].points += 500;
		console.log('points: ', PlayerConfig.getUsers()[0].points);

		$scope.animate = true;
		coinDrop.play();
		console.log('$scope.animate: ', $scope.animate);

		setTimeout ( function () {
			$location.path('app/landing');
			$scope.animate = false;	
		}, 4000 );

	};

	$scope.popup = function(){
		console.log('lol here');
		var popup = $ionicPopup.show({
			title: 'Goal Confirmation',
			template: 'Have you completed all your goals this week?' ,
			scope: $scope,
			buttons: [
				{
					text: 'Yes',
					type: 'button-balanced',
					onTap: function(){
						$scope.moneySaved($scope.amountArr);
						$scope.sweep();
					}
				},
				{
					text: 'No',
					type: 'button-assertive',
					onTap: function(){
						popup.close();
					}
				}
			]
		});

		popup.then(function(res){
			console.log('Tapped', res);
		});
	};




	$scope.startCount();
 
});