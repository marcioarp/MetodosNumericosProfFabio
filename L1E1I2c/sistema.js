String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = angular.module('myAppMath', []);
app.controller('MathController', function($scope, $http) {
	$scope.polinomio = {
		equacao: "e ^ x",
		x0: 0,
		x1: 1,
		x2: 2,
		y0:0,
		y1:0,
		y2:0,
		l0:'',
		l1:'',
		l2:'',
		polinomio:'',
		conferir025: 0.25,
		f025: '',
		p025: '', 
		conferir075: 0.75,
		f075: '',
		p075: '', 
	};
	
	$scope.resultado = function() {
		$scope.polinomio.f025 = math.eval($scope.polinomio.equacao.replaceAll('x',$scope.polinomio.conferir025));
		$scope.polinomio.p025 = math.eval($scope.polinomio.polinomio.replaceAll('x',$scope.polinomio.conferir025)); 

		$scope.polinomio.f075 = math.eval($scope.polinomio.equacao.replaceAll('x',$scope.polinomio.conferir075));
		$scope.polinomio.p075 = math.eval($scope.polinomio.polinomio.replaceAll('x',$scope.polinomio.conferir075)); 
	};
	
	$scope.calcular = function() {
		var decimais=2;
		var x0 = $scope.polinomio.x0;
		var x1 = $scope.polinomio.x1;
		var x2 = $scope.polinomio.x2;
		
		var y0 = math.eval($scope.polinomio.equacao.replaceAll('x',x0));
		var y1 = math.eval($scope.polinomio.equacao.replaceAll('x',x1));
		var y2 = math.eval($scope.polinomio.equacao.replaceAll('x',x2));
		
		$scope.polinomio.y0 = y0;
		$scope.polinomio.y1 = y1;
		$scope.polinomio.y2 = y2;
		 
		var L01 = "((x-"+x1+") * (x - "+x2+"))";
		var temp2 = "(("+x0+"-"+x1+") * ("+x0+" - "+x2+"))";
		var L02 = math.eval(temp2);
		var L = y0 + " * ("+ math.format(L01,decimais) + ' / ' + math.format(L02,decimais)+")";
		$scope.polinomio.l0 = math.format(L,decimais);
		
		L01 = "((x-"+x0+") * (x - "+x2+"))";
		temp2 = "(("+x1+"-"+x0+") * ("+x1+" - "+x2+"))";
		L02 = math.eval(temp2);
		L = y1 + " * ("+ math.format(L01,decimais) + ' / ' + math.format(L02,decimais)+")";
		$scope.polinomio.l1 = math.format(L,decimais); 

		L01 = "((x-"+x0+") * (x - "+x1+"))";
		temp2 = "(("+x2+"-"+x0+") * ("+x2+" - "+x1+"))";
		L02 = math.eval(temp2);
		L = y2 + " * ("+ math.format(L01,decimais) + ' / ' + math.format(L02,decimais)+")";
		$scope.polinomio.l2 = math.format(L,decimais);
		$scope.polinomio.polinomio = "("+$scope.polinomio.l0+")+("+$scope.polinomio.l1+")+("+$scope.polinomio.l2+")";

		$scope.polinomio.l0 = $scope.polinomio.l0.replaceAll('"','');
		$scope.polinomio.l1 = $scope.polinomio.l1.replaceAll('"','');
		$scope.polinomio.l2 = $scope.polinomio.l2.replaceAll('"','');
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
