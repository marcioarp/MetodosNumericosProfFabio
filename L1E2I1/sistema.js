String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = angular.module('myAppMath', []);
app.controller('MathController', function($scope, $http) {
	$scope.matriz = {
		n: 3,
		
		a: [
			[4,-1,1],
			[2,5,3],
			[1,2,4]
		],
		r :[8,3,11],
		
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
		x: [1,2,3],
		xr: [0,0,0],
		xrFraction:[0,0,0],
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
				if ($scope.matriz.a[i][i] != 0) {
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
