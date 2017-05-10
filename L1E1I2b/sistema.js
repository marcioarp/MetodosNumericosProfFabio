String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = angular.module('myAppMath', []);
app.controller('MathController', function($scope, $http) {
	$scope.polinomio = {
		equacao: "e^x",
		x0: 0.5,
		x1: 1,

		y0:0,
		y1:0,

		l0:'',
		l1:'',

		polinomio:'',
		conferir: 0.75,
		f045: '',
		p045: '' 
	};
	
	$scope.resultado = function() {
		$scope.polinomio.f045 = math.eval($scope.polinomio.equacao.replaceAll('x',$scope.polinomio.conferir));
		$scope.polinomio.p045 = math.eval($scope.polinomio.polinomio.replaceAll('x',$scope.polinomio.conferir)); 
	};
	
	$scope.calcular = function() {
		var decimais=2;
		var x0 = $scope.polinomio.x0;
		var x1 = $scope.polinomio.x1;
		
		var y0 = math.eval($scope.polinomio.equacao.replaceAll('x',x0));
		var y1 = math.eval($scope.polinomio.equacao.replaceAll('x',x1));
		
		$scope.polinomio.y0 = y0;
		$scope.polinomio.y1 = y1;
		 
		var L01 = "((x-"+x1+"))";
		var temp2 = "(("+x0+"-"+x1+"))";
		var L02 = math.eval(temp2);
		var L = y0 + " * ("+ math.format(L01,decimais) + ' / ' + math.format(L02,decimais)+")";
		$scope.polinomio.l0 = math.format(L,decimais);
		
		L01 = "((x-"+x0+"))";
		temp2 = "(("+x1+"-"+x0+"))";
		L02 = math.eval(temp2);
		L = y1 + " * ("+ math.format(L01,decimais) + ' / ' + math.format(L02,decimais)+")";
		$scope.polinomio.l1 = math.format(L,decimais); 

		
		$scope.polinomio.polinomio = "("+$scope.polinomio.l0+")+("+$scope.polinomio.l1+")";

		$scope.polinomio.l0 = $scope.polinomio.l0.replaceAll('"','');
		$scope.polinomio.l1 = $scope.polinomio.l1.replaceAll('"','');
		$scope.polinomio.polinomio = $scope.polinomio.polinomio.replaceAll('"','');  
	};
	 
	$scope.draw = function() {
		try {
			functionPlot({
				target : '#plot',
				data : [{
					fn : $scope.polinomio.equacao,
					sampler : 'builtIn', // this will make function-plot use the evaluator of math.js
					graphType : 'polyline'
				},{
					fn : $scope.polinomio.polinomio,
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
