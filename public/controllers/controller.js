var myApp = angular.module('myApp',[]);
myApp.controller('efacturaCtrl',['$scope','$http', function($scope, $http){
	console.log("Hola mundo desde el Clientes");

$scope.productos = [];
$scope.add = function(p)
    {
      var temp = {};
      angular.copy(p, temp);
      $scope.productos.push(temp);
      for(i=0;i< $scope.productos.length;i++)
      {
        $scope.productos[i].importe = $scope.productos[i].cantidad * $scope.productos[i].unitario;
      }
      subtotalizar();
      iva();
      totalizar();
    }

$scope.eliminar = function(c)
    {
      $scope.productos.splice(c,1);
      subtotalizar();
      iva();
      totalizar();
    }

$scope.actualizar_factura = function(i)
    {
      $scope.productos[i].importe=0;
      $scope.productos[i].importe = $scope.productos[i].cantidad * $scope.productos[i].unitario;
      subtotalizar();
      iva();
      totalizar();
    }

var iva = function()
    {
      $scope.iva=($scope.subtotal * 16) / 100;
    }

var subtotalizar = function () 
    { 
      $scope.subtotal=0;
      for(i=0;i<$scope.productos.length;i++)
      {
      $scope.subtotal+= $scope.productos[i].importe;

      }
    }

var totalizar = function()
    {
      $scope.total = ($scope.subtotal + $scope.iva);
    }             

/*Funciones que manejan operaciones con la base de datos*/
var refresh = function() {
	$http.get('/efactura').success(function(response){
		console.log("Recibi los datos que pediste");
		$scope.efactura = response;
		$scope.cliente = "";
	});
}

refresh();

$scope.addCliente = function() {
  console.log($scope.cliente);
  $http.post('/efactura', $scope.cliente).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remover = function(id) {
	console.log("Remover el cliente con el id: " + id);
	$http.delete('/efactura/' + id).success(function(response) {
		refresh();
	});
};	

$scope.editar = function(id){
	console.log(id);
	$http.get('/efactura/' + id).success(function(response){
		$scope.cliente = response;
	});
};
$scope.actualizar = function(){
	console.log($scope.cliente._id);
	$http.put('/efactura/' + $scope.cliente._id, $scope.cliente).success(function(response){
	refresh();
	$scope.cliente = "";
	});

};

}]);