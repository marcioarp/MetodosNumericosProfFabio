String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = angular.module('myAppMath', []);
app.controller('MathController', function($scope, $http) {
	$scope.matriz = {
		n: 4,
		
		a: [
			[0.5,0.25,0,0],
			[0.35,0.8,0.4,0],
			[0,0.25,1,0.5],
			[0,0.249999,1.00001,0.499999]
		],
		r :[0.35,0.77,-0.5,-2.25],
		
		/*
		a: [
			[9,-3,1],
			[1,1,1],
			[9,3,1]
		],
		r :[14,-0.6667,0],
		*/
		/*
		a: [
			[2,1,-3],
			[-1,3,2],
			[3,1,-3]
		],
		r :[-1,12,0],
		*/
		x: [1,2,3,4],
		xr: [0,0,0,0],
		xrFraction:[0,0,0,0],
		geraInputs: function() {
			var i=0, j=0;
			$scope.matriz.a = [];
			$scope.matriz.x = [];
			$scope.matriz.r = [];
			for (i=0;i<$scope.matriz.n;i++) {
				$scope.matriz.a.push([]);
				for (j=0;j<$scope.matriz.n;j++) {
					//$scope.matriz.a[i].push(0);
					$scope.matriz.a[i].push(Math.floor((Math.random() * 100) + 1));
				}
				$scope.matriz.x.push(i+1);
				//$scope.matriz.r.push(0);
				$scope.matriz.r.push(Math.floor((Math.random() * 100) + 1));
				$scope.matriz.xr.push(0);
			}
		},
		meg: function() {
			//console.log('meg');
			$scope.matriz.zerarDiagonal();
			$scope.matriz.zerarDiagonal();	
			for (var i=$scope.matriz.n-1;i>=0;i--) {
				$scope.matriz.xr[i] = (($scope.matriz.r[i] - $scope.matriz.getXr(i)) / $scope.matriz.a[i][i]);
				//console.log($scope.matriz.xr[i]);
			}

			for (i=0;i<$scope.matriz.n;i++) {
				$scope.matriz.xrFraction[i] = math.format(math.fraction($scope.matriz.xr[i]));
				//console.log($scope.matriz.xr[i]);
			}
			
		},
		getXr: function(i) {
			var resultado = 0;
			var h=0;
			for (var j=i+1;j<$scope.matriz.n;j++) {
				resultado += $scope.matriz.xr[j]*$scope.matriz.a[i][j]; 
			}
			return resultado;
		},
		zerarDiagonal: function() {
			var i=0, j=0, l=0;
			var k = [];
			for (i=0;i<($scope.matriz.n-1);i++) {
				//if ($scope.matriz.a[i][i] != 0) 
				{
					k  = [];
					for (j=i+1;j<$scope.matriz.n;j++) {
						k.push($scope.matriz.a[j][i]/$scope.matriz.a[i][i]);
						//console.log(k[j-i-1]);
						$scope.matriz.r[j] = $scope.matriz.r[j] - (k[j-i-1] * $scope.matriz.r[i]); 
					};
					
					
					for (j=i;j<($scope.matriz.n);j++) {
						for (l=i+1;l<($scope.matriz.n);l++) {
							//console.log($scope.matriz.a[l][j]+ ' - (' + k[l-i-1]+ ' * '+$scope.matriz.a[i][j]+')');
							$scope.matriz.a[l][j] = $scope.matriz.a[l][j] - (k[l-i-1] * $scope.matriz.a[i][j]);
							
						}
						
					}
					//return true;
					//console.log(k);
				};
			};
			
		}
	};
	
	
	$scope.matriz.meg();
	
	
});

//https://matrixcalc.org/pt/slu.html#solve-using-Gauss-Jordan-elimination%28%7B%7B1%2F2,0,1%2F4,0,7%2F20%7D,%7B7%2F20,4%2F5,2%2F5,0,77%2F100%7D,%7B0,1%2F4,1,1%2F2,-%281%2F2%29%7D,%7B0,249999%2F1000000,100001%2F100000,4999999%2F10000000,-%289%2F4%29%7D%7D%29
