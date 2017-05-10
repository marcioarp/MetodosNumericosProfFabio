String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = angular.module('myAppMath', []);
app.controller('MathController', function($scope, $http) {
	/*
	 * Criação do objeto integração que armazena os valores 
	 * e métodos principais para executar o exercício
	 */
	$scope.integracao = {
		equacao: "(e^2x ) * (sin (3x))", //equação dada no exercício
		
		metodoTrapezoidal: {
			calc: function() { 
				return [
						      [1, 1],
						      [2, 1],
						      [2, 2],
						      [1, 2],
						      [1, 1]
						    ];
			},
		}, 
		metodoSimpson: function() { 
			
		},
		metodoPontoMedio: function() { 
			
		},
		
		calcular: function() {
			$scope.integracao.draw();
		},
		
		draw : function() {
			try {
				functionPlot({
					target : '#plot',
					yAxis: {domain: [-12, 6]},
  					xAxis: {domain: [-1, 3]},
					data : [{
							fn : $scope.integracao.equacao,
							sampler : 'builtIn', // this will make function-plot use the evaluator of math.js
							graphType : 'polyline',
							closed: true,
							range:[0,2]
						},{
							fn : $scope.integracao.equacao,
							sampler : 'builtIn', // this will make function-plot use the evaluator of math.js
							graphType : 'polyline',
						  }
					],
				});
			} catch (err) {
				console.log(err);
				alert(err);
			}
		},
	
	};
	

	 
	
	//$scope.calcular();
	//$scope.resultado();
	//$scope.draw();
});
