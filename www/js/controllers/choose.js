'use strict';

angular.module('MortgageSaver')
.controller('ChooseCtrl', function ($scope, PlayerConfig, $ionicPopup, $location){

	window.choose 	 = $scope;
	// window.location  = $location;
	window.player    = PlayerConfig;
	var set 			   = PlayerConfig.getSaved();
	$scope.foods 		 = PlayerConfig.getFood();

	$scope.set 			 = set[0];
	$scope.animate 	 = false;
	$scope.services  = PlayerConfig.getServices();
	$scope.goals 		 = PlayerConfig.getGoals();
	$scope.goalSaved = PlayerConfig.getSavedGoals();
	$scope.change 	 = set[0];
	$scope.tempGoals = [];
	$scope.amountArr = [];



	console.log('$scope.animate: ', $scope.animate);

	$scope.foodCost = function($saved){
		var coffeeAvg = 3.77,
				beerAvg 	= 7.25,
				lunchAvg	= 10,
				dinnerAvg = 80;

		var coffees 	= Math.round($saved / coffeeAvg),
			  beers 		= Math.round($saved / beerAvg),
			  lunch 		= Math.round($saved / lunchAvg),
			  dinner 		= Math.round($saved / dinnerAvg);


		PlayerConfig.addToFood(coffees, lunch, beers, dinner);
	};


	// $scope.itemCost = function($saved){
	// 	var cigarettesAvg 	 = 22,
	// 			movieTicketsAvg  = 20,
	// 			netflixAvg			 = 16,
	// 			foodDeliveryAvg  = 8;

	// 	var cigarettes 		= Math.round($saved / cigarettesAvg),
	// 			movieTickets  = Math.round($saved / movieTicketsAvg),
	// 			netflix 			= Math.round($saved / netflixAvg),
	// 			foodDelivery  = Math.round($saved / foodDeliveryAvg);

	// 	PlayerConfig.addToItems(cigarettes, movieTickets, netflix, foodDelivery);
	// 	$scope.items = PlayerConfig.getItems();
	// };



	$scope.foodCost(set[0]);
	// $scope.itemCost(set[0]);


	$scope.popSavingsArray = function(dollarAmount) {
		if(dollarAmount === typeof(undefined)){
			dollarAmount 	 = 0;
		}

		$scope.amountArr.push(dollarAmount);
		$scope.moneySaved($scope.amountArr);
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
		var confirmedGoals = PlayerConfig.getGoals(),
			  user 					 = PlayerConfig.getUsers(),
			  coinDrop 			 = new Audio('audio/coin-drop-effect.mp3');
			  // points				 = user[0].points;

		$scope.moneySaved  = user[0].moneySaved + $scope.monthlySaving;
		user[0].moneySaved = $scope.moneySaved;
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



	$scope.home = function(){
		$location.path('app/landing');
	};





	$scope.storeVariables = function(name, subText, numberOf){
		console.log('clicked...');

		$scope.numberOf  = numberOf;
		$scope.name 		 = name;
		$scope.subText   = subText;
		$scope.tempGoals = [];

		if((numberOf / 4) !== 1){
			name = name + 's';
		}

		$scope.increment = function() {
			$scope.numberOf = $scope.numberOf + 1;
		};


		$scope.decrement = function () {
			if($scope.numberOf !== 0){
				$scope.numberOf = $scope.numberOf - 1;
			}
		};


		var popup = $ionicPopup.confirm({
			title: 'Are you sure?',
			template: 'Lock in ' + $scope.numberOf + ' ' + subText + ' ' + name + '?' +
								'<div ng-controller="ChooseCtrl" class="row">' +
								'<div style="width: 10px" class="col"> ' +
								'<span ng-click="increment()" class="ion-arrow-up-b positive" id="arrow"></span>' +
								'<br/>' +
								'<span ng-click="decrement()" class="ion-arrow-down-b positive" id="arrow"></span>' +
								'</div>' +
								'<div class="col">' +
								'<p ng-modal="numberOf" >{{numberOf}} </p>' +
								'</div>' +
								'</div>' ,
			scope: $scope,
		});


		popup.then(function(res) {
			if(res) {

				var value = 0;
				console.log('numberOf: ', numberOf);

				if(name === 'Coffees'){

					console.log('inside coffee');
					var coffeeValue = Math.round( $scope.numberOf * 3.77);
					value = coffeeValue;

				} else if(name === 'Lunchs') {

					console.log('inside lunch');
					var lunchValue = Math.round( $scope.numberOf * 10);
					value = lunchValue;

				} else if(name === 'Beers') {

					console.log('inside beer');
					var beerValue = Math.round( $scope.numberOf * 7.25);
					value = beerValue;

				} else if(name === 'Dinners') {

					console.log('inside dinner');
					var dinnerValue = Math.round( $scope.numberOf * 80);
					value = dinnerValue;

				}

				PlayerConfig.addToGoals(name, $scope.numberOf, value);

				if((set - value) <= 0){
					console.log('inside >= 0');
					$scope.change = 0;
				} else {
					console.log('inside not >= 0');
					console.log('value: ', value);
					$scope.change = $scope.change - value;
				}
				
			} else {
				PlayerConfig.destroyTemp();
				console.log('cancelled');
			}
		});


		$scope.tempGoals = PlayerConfig.getGoalsTemporary();


		$scope.goToGoals = function() {
			var coinDrop = new Audio('audio/coin-drop-effect.mp3');

			console.log('button clicked');
			PlayerConfig.getUsers()[0].points += 100;
			console.log('points: ', PlayerConfig.getUsers()[0].points);
			PlayerConfig.confirmGoals($scope.tempGoals);
			$scope.animate = true;
			coinDrop.play();
			setTimeout ( function () {
				$scope.animate = false;
				$location.path('/app/what-if/choose/add-goal');
			}, 4000 );
		};

	};
	

});