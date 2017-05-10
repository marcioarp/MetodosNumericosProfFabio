String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = angular.module('myAppMath', []);
app.controller('MathController', function($scope, $http) {
	$scope.polinomio = {
		equacao: "",
		amostras: 7,
		x:[0,6,10,13,17,20,28],
		y1:[6.67,17.33,42.67,37.33,30.1,29.31,28.74],
		y2:[6.67,16.11,18.89,15,10.56,9.44,8.89],
		polinomio1:'',
		polinomio2:'',
		fx1: '',
		fx2:'',
		conferir: 2
	};
	
	$scope.resultado = function() {
		$scope.polinomio.fx1 = math.eval($scope.polinomio.polinomio1.replaceAll('x',$scope.polinomio.conferir));
		$scope.polinomio.fx2 = math.eval($scope.polinomio.polinomio2.replaceAll('x',$scope.polinomio.conferir)); 
	};
	
	$scope.calcular = function() {
		$scope.polinomio.polinomio1 = $scope.getPolinomio($scope.polinomio.x, $scope.polinomio.y1);
		$scope.polinomio.polinomio2 = $scope.getPolinomio($scope.polinomio.x, $scope.polinomio.y2);
	};
	
	$scope.getPolinomio = function(arrayX, arrayY) {
		var polinomio = '', somapol = '';
		var Li = '';
		for (var i=0; i<$scope.polinomio.amostras;i++) {
			Li = $scope.getL(arrayX,i);
			polinomio +=  somapol +  '('+arrayY[i]+' * '+Li+')';
			somapol = ' + ';
		} 
		return polinomio;
	};
	
	$scope.getL = function(arrayX, k) {
		var dividendo = '', multdividendo='';
		var divisor = '', multdivisor=''; 
		for (var i=0; i<$scope.polinomio.amostras;i++) {
			if (i!=k) {
				dividendo += multdividendo + '(x -'+arrayX[i]+')';
				multdividendo = '*';
			};
		}; 

		for (var i=0; i<$scope.polinomio.amostras;i++) {
			if (i!=k) {
				divisor +=  multdivisor + '('+arrayX[k]+' -'+arrayX[i]+')';
				multdivisor = '*';
			};
		};
		var valDivisor = math.eval(divisor);
		var retorno = '('+dividendo+')/ ('+valDivisor+')';
		retorno = retorno.replaceAll('"','');
		return retorno;
	};
	
	
	 
	$scope.draw = function() {
		try {
			functionPlot({
				target : '#plot',
				data : [{
					fn : $scope.polinomio.polinomio1,
					sampler : 'builtIn', // this will make function-plot use the evaluator of math.js
					graphType : 'polyline'
				},{
					fn : $scope.polinomio.polinomio2,
					sampler : 'builtIn', // this will make function-plot use the evaluator of math.js
					graphType : 'polyline'
				}]
			});
		} catch (err) {
			console.log(err);
			alert(err);
		}
	};
	
	$scope.calcular();
	$scope.resultado();
	$scope.draw();
});
