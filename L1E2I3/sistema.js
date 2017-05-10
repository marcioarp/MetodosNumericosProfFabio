String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = angular.module('myAppMath', []);
app.controller('MathController', function($scope, $http) {
	$scope.matriz = {
		n: 10,
		
		aa: [],
		ra :[],
		xa: [],
		xra: [],
		xrFractiona:[],


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
	
	for (var i=0;i<10;i++) {
		$scope.matriz.aa.push([]);
		for (var j=0;j<10;j++) {
			$scope.matriz.aa[i].push(0);
		}
		$scope.matriz.ra.push(0);
		$scope.matriz.xa.push(0);
		$scope.matriz.xra.push(0);
		$scope.matriz.xrFractiona.push(0);
		
	}
	for (i=0;i<10;i++) {
		$scope.matriz.aa[i][i] = 2;
	}
	
	for (i=1;i<10;i++) {
		$scope.matriz.aa[i][i-1] = -1;
	}

	for (i=0;i<9;i++) {
		$scope.matriz.aa[i][i+1] = -1;
	}
	
	for (i=1;i<9;i++) {
		$scope.matriz.ra[i] = 0;
	}
	$scope.matriz.ra[0] = 1;
	$scope.matriz.ra[9] = 1;
	
	
	$scope.matriz.meg($scope.matriz.aa,$scope.matriz.ra,$scope.matriz.xa,$scope.matriz.xra,$scope.matriz.xrFractiona);
	
});

