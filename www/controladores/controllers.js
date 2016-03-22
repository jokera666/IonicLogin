angular.module('starterMiApp.controllers', [])

.controller('LoginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){


  $scope.enviarFormulario = function(form){
    //$scope.visibilidadMensaje = false;
    $scope.animacion = ""; 
    var url = "http://nestor.esy.es/IonicServer/resibir.php";
    console.log(url);

    if(form == undefined)
    {
       $scope.visibilidadMensaje = true;
       $scope.userServ = "Usuario o contraseña incorrecto."; 
       $scope.animacion = "animated shake";
       return;
       
    }    


    if( form.user == undefined || form.pass  == undefined )
      {
        $scope.visibilidadMensaje = true; 
        $scope.userServ = "Usuario o contraseña incorrecto."; 
        $scope.animacion = "animated shake";
        return;
        
      }

    //var serviceUrl = 'file:///android_asset/www/'; // esta variable es necesaria para que funcione en el dispositivo.
  //$http.get(serviceUrl+'js/data.json') // cargar los datos del fichero data.json


     $http({
        method: 'POST',
        url: url,
        data: form,
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
    }).then(function successCallback(response) {

            //data es el array de parametros de la consulta php
            $scope.userServ = response.data;
            console.log($scope.userServ);

            if($scope.userServ=="Usuario o contraseña incorrecto.")
            {
               
              $scope.visibilidadMensaje = true; 
              $scope.userServ = "Usuario o contraseña incorrecto."; 
              $scope.animacion = "animated shake";
               
            }

            else 
            {
               
               $scope.visibilidadMensaje = false;
               var myError = angular.element( document.querySelector( '#msgError' ) );
               myError.remove();   //removes element
               
               $state.go('perfil' ,{param1: $scope.userServ, param2: form.pass}); 
            } 

            /**
            var str1 = $scope.userServ;
            var str2 = "ERROR AL LOGEAR";

            console.log("str1 es: "+str1+" y str2 es: "+str2);

            //compara dos cadenas si n es igual a 0 son iguales
            var n = str1.localeCompare(str2); 
            console.log("n es igual a: "+n);
            */



      }, function errorCallback(error) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.error("el error es: "+error);
      });

  } // fin de enviarFormulario

}])

.controller('PerfilCtrl', ['$scope', '$http', '$state','$stateParams', function($scope, $http, $state,$stateParams){

     console.log($stateParams);
     $scope.parametro = $stateParams.param1;
     $scope.contrasena = $stateParams.param2;


}])