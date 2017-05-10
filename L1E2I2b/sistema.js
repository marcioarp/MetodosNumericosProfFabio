String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = angular.module('myAppMath', []);
app.controller('MathController', function($scope, $http) {
	$scope.matriz = {
		n: 4,
		
		aa: [
			[0.5,0.25,0,0],
			[0.35,0.8,0.4,0],
			[0,0.25,1,0.5],
			[0,0.249999,1.00001,0.499999]
		],
		ra :[0.35,0.77,-0.5,-2.25],
		xa: [1,2,3,4],
		xra: [0,0,0,0],
		xrFractiona:[0,0,0,0],


		ab: [
			[0.5,0.25,0,0],
			[0.35,0.8,0.4,0],
			[0,0.25,1,0.5],
			[0,0.249999,1.00001,0.499999]
		],
		rb :[0.356,0.774,-0.501,-2.249],
		xb: [1,2,3,4],
		xrb: [0,0,0,0],
		xrFractionb:[0,0,0,0],
		
		difAB:[0,0,0,0],
		
		meg: function(a,r,x,xr,xrFraction) {
			//console.log('meg');
			$scope.matriz.zerarDiagonal(a,r);
			$scope.matriz.zerarDiagonal(a,r);	
			for (var i=$scope.matriz.n-1;i>=0;i--) {
				xr[i] = ((r[i] - $scope.matriz.getXr(i,xr,a)) / a[i][i]);
				//console.log($scope.matriz.xr[i]);
			}

			for (i=0;i<$scope.matriz.n;i++) {
				xrFraction[i] = math.format(math.fraction(xr[i]));
				//console.log($scope.matriz.xr[i]);
			}
			
		},
		getXr: function(i,xr,a) {
			var resultado = 0;
			var h=0;
			for (var j=i+1;j<$scope.matriz.n;j++) {
				resultado += xr[j]*a[i][j]; 
			}
			return resultado;
		},
		zerarDiagonal: function(a,r) {
			var i=0, j=0, l=0;
			var k = [];
			for (i=0;i<($scope.matriz.n-1);i++) {
				//if ($scope.matriz.a[i][i] != 0) 
				{
					k  = [];
					for (j=i+1;j<$scope.matriz.n;j++) {
						k.push(a[j][i]/a[i][i]);
						//console.log(k[j-i-1]);
						r[j] = r[j] - (k[j-i-1] * r[i]); 
					};
					
					
					for (j=i;j<($scope.matriz.n);j++) {
						for (l=i+1;l<($scope.matriz.n);l++) {
							//console.log($scope.matriz.a[l][j]+ ' - (' + k[l-i-1]+ ' * '+$scope.matriz.a[i][j]+')');
							a[l][j] = a[l][j] - (k[l-i-1] * a[i][j]);
							
						}
						
					}
					//return true;
					//console.log(k);
				};
			};
			
		}
	};
	
	
	$scope.matriz.meg($scope.matriz.aa,$scope.matriz.ra,$scope.matriz.xa,$scope.matriz.xra,$scope.matriz.xrFractiona);
	$scope.matriz.meg($scope.matriz.ab,$scope.matriz.rb,$scope.matriz.xb,$scope.matriz.xrb,$scope.matriz.xrFractionb);
	
	$scope.matriz.difAB = [
		$scope.matriz.xra[0] - $scope.matriz.xrb[0],
		$scope.matriz.xra[1] - $scope.matriz.xrb[1],
		$scope.matriz.xra[2] - $scope.matriz.xrb[2],
		$scope.matriz.xra[3] - $scope.matriz.xrb[3],
	];
	/*
	for (i=0;i<$scope.matriz.n;i++) {
		xrFraction[i] = math.format(math.fraction(xr[i]));
		//console.log($scope.matriz.xr[i]);
	}
	*/
	
	
});

//https://matrixcalc.org/pt/slu.html#solve-using-Gauss-Jordan-elimination%28%7B%7B1%2F2,0,1%2F4,0,7%2F20%7D,%7B7%2F20,4%2F5,2%2F5,0,77%2F100%7D,%7B0,1%2F4,1,1%2F2,-%281%2F2%29%7D,%7B0,249999%2F1000000,100001%2F100000,4999999%2F10000000,-%289%2F4%29%7D%7D%29
