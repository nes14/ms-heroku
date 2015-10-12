'use strict';

angular.module('MortgageSaver')
.service('PlayerConfig', function (){
	var _self = this;

	var users = [
		{id: 1, name: 'Bill', daysSaved: 22, moneySaved: 5282, targetDate: '2020, 6, 14', monthlyRepayment: 5646.56, points: 0}
		// {id: 2, name: 'George', daysSaved: 54, moneySaved: '$10433.96', targetDate: '09/30/2040 00:00:00'}
	];

	var food = [
		{name: 'Coffee', numberOf: 0, img: 'coffee.jpg', subText: 'cups of', postText: ''},
		{name: 'Lunch', numberOf: 0, img: 'lunch.jpg', subText: 'takeout', postText: ''},
		{name: 'Beer', numberOf: 0, img:'beer.jpg', subText: 'pints of', postText: ''},
		{name: 'Dinner', numberOf: 0, img: 'dinner.jpg', postText: 'for two'}
	];

	// var items = [
	// 	{name: 'Cigarettes', numberOf: [0], img:''},
	// 	{name: 'Movie Tickets', numberOf: [0], img:''},
	// 	{name: 'Music Albums', numberOf: [0], img:''},
	// 	{name: 'Food Deliveries', numberOf: [0], img:''},
	// ];

	var saved = [];

	var goalsTemporary = [];
	var goalsConfirmed = [];
	var goalsSaved 		 = [];
	var monthlySaving	 = [];


	this.addToFood = function(coffeeValue, lunchValue, beerValue, dinnerValue){
		food[0].numberOf = 0;
		food[1].numberOf = 0;
		food[2].numberOf = 0;
		food[3].numberOf = 0;

		food[0].numberOf = coffeeValue;
		food[1].numberOf = lunchValue;
		food[2].numberOf = beerValue;
		food[3].numberOf = dinnerValue;
	};

	// this.addToItems = function(cigarettesValue, movieTicketsValue, netflixValue, foodDeliveryValue){
	// 	console.log('here inside addToItems');
	// 	items[0].numberOf[0] = [];
	// 	items[1].numberOf[0] = [];
	// 	items[2].numberOf[0] = [];
	// 	items[3].numberOf[0] = [];

	// 	items[0].numberOf[0].push(cigarettesValue);
	// 	items[1].numberOf[0].push(movieTicketsValue);
	// 	items[2].numberOf[0].push(netflixValue);
	// 	items[3].numberOf[0].push(foodDeliveryValue);
	// 	// console.log('arrays updated...');
	// };



	// REFACTOR ME
	
	this.addToGoals = function(nameValue, numValue, value){
		var x = {name: nameValue, numberOf: numValue, dollarAmount: value, tagLine:'Per week'};
		goalsTemporary.push(x);	

	};

	this.getFood = function(){
		return food;
	};
	
	this.getItems = function(){
		// return items;
	};

	this.getServices = function(){
		// return items;
	};

	this.getUsers = function(){
		return users;
	};

	this.addToSaved = function(value){
		saved = [];
		saved.push(value);
	};

	this.getSaved = function(){
		return saved;
	};

	this.destroyTemp = function(){
		goalsTemporary = [];
	};

	this.confirmGoals = function(goals) {
		goalsTemporary = [];

		var length = goals.length;
		for(var i = 0; i < length; ++i){
			var value = goals[i];
			goalsConfirmed.push(value);
		}
	};

	this.saveConfirmed = function(goals) {

		var length = goals.length;
			for(var i = 0; i < length; ++i){
			var value = goals[i];
			goalsSaved.push(value);
			goalsConfirmed = [];
		}

	};

	this.addMonthlySaving = function(saving) {
		console.log('saving: ', saving);
		monthlySaving.push(saving);
	};

	this.getSavedGoals = function() {
		return goalsSaved;
	};

	this.getGoals = function() {
		return goalsConfirmed;
	};

	this.getGoalsTemporary = function(){
		return goalsTemporary;
	};

	this.getMonthlySaving = function() {
		return monthlySaving;
	};


	return this;
});