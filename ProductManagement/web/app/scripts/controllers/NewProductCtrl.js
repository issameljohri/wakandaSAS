(function(){
	angular
	     .module("productManagement")
         .controller('NewProductCtrl', NewProductCtrl);
         
                 function NewProductCtrl($scope, WakandaManager) {
                 	
                 	
 	                    WakandaManager.ready().then(function () {
                              var $wakanda = WakandaManager.$wakanda;
                              var ds = $wakanda.$ds;
                              }) // WakandaManager
                     
                        $scope.saveProduct = function(product){
                          	
 	                                 var newProduct = WakandaManager.$wakanda.$ds.Product.$create({
	
                                             productName: product.name ,
                                             description: product.description ,
                                             price: product.price ,
                                             imageUrl: product.imageUrl ,
                                             category: product.category
                                             
                                                    });

                                             newProduct.$save().$promise.then(function () {
                                                 toastr.success('Product Saved Successfully');
                                              });
                                }
                                
                        $scope.cancelEdit = function(){
           	                       window.location = "#/products";
                              }
    };
    }());