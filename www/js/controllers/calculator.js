'use strict';

angular.module('MortgageSaver')
.controller('CalcCtrl', function ($scope, PlayerConfig, $location, $ionicPopup) {

	window.calc  		   = $scope;
	window.player 		 = PlayerConfig;
	window.countdown   = countdown;
	$scope.saved 			 = 0;
	$scope.extra 			 = 0;
	$scope.chartObject = {};


	$scope.term 	 	 = 30;
	$scope.decimal 	 = '5.45%';
	$scope.principal = 1000000;
	var decimal 		 = parseFloat($scope.decimal) / 100;
	$scope.interest  = decimal;
	$scope.payments  = $scope.term * 12;




	/**
   * Construct the JSON necessary to display a chart.
   * outstanding_amounts is a 360 element array where each element is
   * expected to have a struct with two values, outstanding total owed  and outstanding interest
   * Returns the JSON for the chart
   * EDIT this if you want to change the chart layout
   */
  $scope.updateChart = function( chart, outstandingAmounts ) {

  	chart.data.rows=[];

	  // Set up data rows
		for( var i=0; i<=360; i++ ) {
			var row = {
			  'c': [
			  	{
			       'v': i
			    },
			    {
			      'v': outstandingAmounts[i].total
			    },
			    {
			      'v': outstandingAmounts[i].principal
			    }
			  ]
			};
			chart.data.rows.push( row );
		}
	};


/**
 * Calculate amount outstanding and principal outstanding for 360 months assuming
 * the given initial amount and the monthly repayment
 * Return the array of 361 values
 */
	$scope.makeAmounts = function( initialAmount, monthlyRepayment, numMonths, monthlyInterestRate ) {
		var outstanding = numMonths * monthlyRepayment;
		var principal 	= $scope.principal;
		var amounts 		= [];
		// var numPayments = initialAmount / monthlyRepaym ent;

		amounts.push( {'total':outstanding, 'principal':principal} );

		for(var i = 1; i <= 360; i++){
 
			var monthlyInterest 		 =  (principal * monthlyInterestRate );
			var monthlyPrincipalPaid =  monthlyRepayment - monthlyInterest;



			if(outstanding > 0){
				outstanding -= monthlyRepayment;
				if(outstanding < 0){
					outstanding = 0;
				}
			}


			if(principal > 0 ){
				principal -=  monthlyPrincipalPaid;
				if(principal < 0 ){
					principal = 0;
				}
			}


			amounts.push( {'total':outstanding, 'principal':principal} );

		}
		return amounts;
	};


  /**
   * Construct the JSON necessary to display a chart.
   * outstanding_amounts is a 360 element array where each element is
   * expected to have a struct with two values, outstanding total owed  and outstanding interest
   * Returns the JSON for the chart
   * EDIT this if you want to change the chart layout
   */
  $scope.makeChart = function( ) {

  	 var chart = {
			'type': 'AreaChart',
		  'displayed': false, 
		  'data': {
		    'cols': [
		      {
		        'id': 'years',
		        'label': 'Years',
		        'type': 'number',
		        'p': {}
		      },
		      {
		        'id': 'total',
		        'label': 'Total',
		        'type': 'number',
		        'p': {}
		      },
		      {
		        'id': 'principal',
		        'label': 'Principal',
		        'type': 'number',
		        'p': {}
		      }
		    ],
		    'rows': []
		  },
		  'options': {
		    'title': 'Mortgage Repayments',
		    'curveType': 'function',
		    'isStacked': 'false',
		    'fill': 20,
		    'displayExactValues': true,
		    'vAxis': {
		      'title': '',
		      'gridlines': {
		        'count': 10
		      }
		    },
		    'hAxis': {
		      'title': 'Years',
		      'ticks': [{v:0, f:'1990'}, {v:60, f:'1995'}, {v:120, f:'2000'}, {v:180, f:'2005'}, {v:240, f:'2010'}, {v:300, f:'2015'}, {v:360, f:'2020'}]
		    }
		  },
		  'formatters': {}
	};

	var amounts = $scope.makeAmounts( $scope.principal, 5454.64);

	$scope.updateChart( chart, amounts );

	return chart;
};

	$scope.chartObject = $scope.makeChart();


	$scope.findPayment = function(borrowing, interestRate, numMonths) {

		var monthlyInterestRate = interestRate / 12;
		$scope.payment 				=  ( (borrowing * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numMonths) ) );
		$scope.monthlyPayment = Math.round($scope.payment * 100) / 100;

		// console.log('monthlyPayment: ', $scope.monthlyPayment);
		// console.log('total paid    : ', $scope.monthlyPayment * numMonths);

		$scope.interestSaved($scope.monthlyPayment, numMonths);
		$scope.monthlyExtra($scope.monthlyPayment);

		var amounts = $scope.makeAmounts( borrowing, $scope.monthlyPayment, numMonths, monthlyInterestRate);
		$scope.updateChart($scope.chartObject, amounts);

	};


	
	$scope.slider = function(numberOfMonths) {
		console.log(numberOfMonths);
		$scope.findPayment($scope.principal, $scope.interest, numberOfMonths);
	};



	$scope.interestSaved = function (payment, payments) {
		$scope.maxInterest = Math.round(1032761.6000000001 * 100) / 100;
		var total = payments * payment;
		$scope.variableInterest = total - $scope.principal;
		var saved = $scope.maxInterest - $scope.variableInterest;
		$scope.saved = Math.round(saved * 100) / 100;
	};



	$scope.monthlyExtra = function(current) {
		var player = PlayerConfig.getUsers();
		var extra = current - player[0].monthlyRepayment;
		$scope.extra = Math.round(extra);
	};



	$scope.showMeHow = function(extra) {
		PlayerConfig.addToSaved(extra);
		$location.path('/app/what-if/choose');
	};



	$scope.timeRemaining = function() {
		var playerConfig = PlayerConfig;
		console.log('playerConfig: ', playerConfig);
	};




	// $scope.findTotal = function(monthlyRepayment, _ignore_, numTicks, numPayments) {
	// 	$scope.totalObj = [];

	// 	if (typeof monthlyRepayment && typeof _ignore_ && typeof numTicks  === 'undefined'){
	// 		monthlyRepayment 	 = 5646.56;
	// 		_ignore_   = 60;
	// 		numTicks = 7;
	// 	}

	// 	var outstanding = monthlyRepayment * numPayments;
	// 	$scope.totalObj.push(outstanding);

	// 	for(var i = 1; i <= 360; ++i){

	// 		if(outstanding > 0){
	// 			outstanding -= monthlyRepayment;
	// 			if(outstanding < 0){
	// 				outstanding = 0;
	// 			}
	// 		}

	// 		$scope.totalObj.push(outstanding);
	// 	}


	// 	for(var x = 0; x < 360; x++){
	// 		PlayerConfig.loadChart().data.rows[x].c[1].v = $scope.totalObj[x];
	// 	}

	// };



	$scope.findprincipal = function(repayment, length, interval) {
		$scope.principalObject   = [];
		$scope.original 			 	 = $scope.principal;
		$scope.outstanding  		 = $scope.original;

		for(var i = 0; i < interval; ++i) {
			// console.log('outstanding: ', $scope.outstanding);
			$scope.x 	 				 			 =  ($scope.outstanding * $scope.interest) / (1 - Math.pow(1 + $scope.interest, - $scope.payments) );
			$scope.totalInterest 	   = ($scope.interest * $scope.outstanding);
			$scope.principalPerMonth =  ($scope.x - $scope.totalInterest);
			var principal 	 				 =  $scope.outstanding - ($scope.principalPerMonth * length);
			$scope.outstanding 		 	 =  principal;
			// console.log('outstanding: ', $scope.outstanding);


			$scope.principalObject.push(principal);
		}

		for(var x = 0; x < 7; x++){
			PlayerConfig.loadChart().data.rows[x].c[2].v = $scope.principalObject[x];
		}


	};



});