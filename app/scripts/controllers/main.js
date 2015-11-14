'use strict';

/**
 * @ngdoc function
 * @name playlistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playlistApp
 */
angular.module('playlistApp', ["firebase"])
  .controller('MainCtrl', ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
    
    $scope.canciones = [];
    
    
    $.ajax({
	url: "http://freemusicarchive.org/recent.jsonp" ,
	dataType: "jsonp",
	success: function( data ) {

        
        $scope.$apply(function(){
            
                 var canciones_princip = data.aTracks;
        console.log(canciones_princip);
     for(var i = 0; i < canciones_princip.length; i++) {
    var obj = canciones_princip[i];
         
         $scope.canciones.push({nombre:obj.track_title, artista:obj.artist_name, imagen:obj.track_image_file}); 
            
         } 
        })  
	}
    });
    
    
   // $scope.listas = [{nombre:'Favoritas',canciones:[]}];
    

    
    $scope.addLista = function () {
 // $scope.listas.push({nombre: $scope.listaInput , canciones:[]});
            //ADD TO FIREBASE
      $scope.listas.$add({
        nombre: $scope.listaInput ,
        canciones: []
      });

        
  $scope.listaInput = '';
        
   
};
    
     $scope.addCancion = function(index) {
         
         var idx = $scope.listas[$scope.select].$id;
         
         var obj = $scope.listas.$getRecord(idx);
         
         
         var lisp = [];
     
         if(obj.canciones){
             lisp = obj.canciones;
         }
         

         
         obj.canciones = lisp;
         
         obj.canciones.push($scope.canciones[index]);
         
         $scope.listas.$save(obj);

    }
     
     $scope.removeCancion = function(index) {
         
         
          var idx = $scope.listas[$scope.select].$id;
         
         var obj = $scope.listas.$getRecord(idx);
         
         
         var lisp = [];
     
         if(obj.canciones){
             lisp = obj.canciones;
         }
         

         
         obj.canciones = lisp;
         
         obj.canciones.splice(index, 1);
         
         $scope.listas.$save(obj);
         
         
    }
     
     
     $scope.removeLista = function() {
         //$scope.listas.splice(parseInt($scope.select),1);
         $scope.listas.$remove(parseInt($scope.select));
         //alert ($scope.listas[$scope.select].nombre)
         
     }
     
     
    //CREATE A FIREBASE REFERENCE
    var listasRef = new Firebase("https://listas-reproduc.firebaseio.com/");
    
    // GET MESSAGES AS AN ARRAY
    $scope.listas = $firebaseArray(listasRef);
      
          
    
    
  }]);
