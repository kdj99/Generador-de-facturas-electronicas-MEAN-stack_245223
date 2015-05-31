var myApp = angular.module('myApp',[]);
myApp.controller('efacturaCtrl',['$scope','$http', function($scope, $http){
	console.log("Hola mundo desde el controlador");

/*Ng-pattern usa la variable regex para comparar los campos asignados a cada input a validar*/
$scope.regex = {
        telefono: /^[0-9]{3}-? ?[0-9]{7}$/,
        email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        rfc: /^[a-zA-Z]{3,4}(\d{6})((\D|\d){3})?$/,
        cifra: /^[0-9]{1,6}$/
      };

$scope.botonactualizar=false;
$scope.moduloclientes=true;
$scope.date = new Date();


function soloNumeros(e) {
// capturamos la tecla pulsada
        var teclaPulsada=window.event ? window.event.keyCode:e.which;
        // capturamos el contenido del input
        var valor=document.getElementById("inputTelefono").value;
 
        if(valor.length<10)
        {
            // 13 = tecla enter
            // Si el usuario pulsa la tecla enter o el punto y no hay ningun otro
            // punto
            if(teclaPulsada==13)
            {
                return true;
            }
 
            // devolvemos true o false dependiendo de si es numerico o no
            return /\d/.test(String.fromCharCode(teclaPulsada));
        }else{
            return false;
        }
}      
$scope.productos = [];
$scope.add = function(p)
    {
      alert("Prodcto agregado correctamente a la factura :) !");
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
      var decision = window.confirm('Estas seguro de eliminar este producto de la factura ?')
      if(decision == true){
      $scope.productos.splice(c,1);
      subtotalizar();
      iva();
      totalizar();
      }
      else{
        return false;
      }
    }

$scope.actualizar_factura = function(i)
    {
      $scope.productos[i].importe=0;
      $scope.cantidad_total=0;
      $scope.productos[i].importe = $scope.productos[i].cantidad * $scope.productos[i].unitario;
      for(i=0;i<$scope.productos.length;i++)
      {
        var temp=0;
        temp=$scope.productos[i].cantidad;
        $scope.cantidad_total=$scope.cantidad_total+temp;
      }
      subtotalizar();
      iva();
      totalizar();
    }
$scope.validar_producto=function()
{
  $scope.nombreRepetido==false;
  for(i=0;i<$scope.productos.length;i++)
  {
    if($scope.productos[i].nombre==producto.nombre)
    {
      $scope.nombreRepetido==true;
    }
  }
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
    $scope.botonactualizar=false;
	});
}

refresh();

$scope.addCliente = function() {
  console.log($scope.cliente);
  $http.post('/efactura', $scope.cliente).success(function(response) {
    alert("Cliente ingresado correctamente al sistema :) !");
    console.log(response);
    refresh();
  });
};

$scope.remover = function(id) {
  var decision = window.confirm('Estas seguro de eliminar a este cliente ?');
	if(decision==true){
    console.log("Remover el cliente con el id: " + id);
  	$http.delete('/efactura/' + id).success(function(response) {
  		refresh();

  	});
  }
  else{
    return false;
  }
};	

$scope.editar = function(id){
	$scope.botonactualizar=true;
  console.log(id);
	$http.get('/efactura/' + id).success(function(response){
		$scope.cliente = response;
	});
};
$scope.actualizar = function(){
	console.log($scope.cliente._id);
	$http.put('/efactura/' + $scope.cliente._id, $scope.cliente).success(function(response){
  alert("Datos del cliente actualizados correctamente en el sistema :) !");  
	refresh();
	$scope.cliente = "";
  $scope.botonactualizar=false;
	});

};

}]);