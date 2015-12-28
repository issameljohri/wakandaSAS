

(function(){
	angular
	     .module("productManagement")
         .controller("ProductListCtrl", ProductListCtrl);
          
         
    function ProductListCtrl($scope, WakandaManager) {
 	           
 	        $scope.sortorder = 'price';
 	           
 	        WakandaManager.ready().then(function () {
                              var $wakanda = WakandaManager.$wakanda;
                              var ds = $wakanda.$ds;
                     }) // WakandaManager
  
            WakandaManager.$wakanda.init().then(function () {
                WakandaManager.$wakanda.$ds.Product.$all().$promise.then(function(event) {
                   $scope.products = event.result;
               });
             }) // end init
  
            $scope.addToPanel = function(product){
           	
                          // return currentUser
               WakandaManager.$wakanda.$currentUser().$promise.then(function (event) {
                     var currentUser = event.result;
                     
                        // retrieve User DataClass IF exist   
                  WakandaManager.$wakanda.$ds.User.$query({ filter: 'login = :1 ', params: [currentUser.userName]}).$promise.then(function (event) {
                                   var userArray = event.result;     // $query() return an array 
                                   var theUser = userArray[0];
                                   
                            // tester si le produit est deja en panier 
                    WakandaManager.$wakanda.$ds.UserPanel.$query({ filter: 'userID = :1 &&  productID = :2 ', params: [theUser.ID, product.ID]}).$promise.then(function (event) {   
                            var itExist = event.result; 
                            if(itExist.length == 0){
                                    var newPanel = WakandaManager.$wakanda.$ds.UserPanel.$create({
	                                           userID: theUser.ID,
	                                           userName: theUser.login,
                                    	       productID: product.ID 
                                    	});
           
                                    newPanel.$save().$promise.then(function () {
                                       toastr.success(product.productName+ '  added to your panel ');
                                              });     
                            }else{
                            	toastr.info(product.productName + 'Exist in your panel ! You Can increment quantity in "My Panel" Tab');
                            }     
                  }); // end $query
                    })
   
                }); // end $currentUser
                      
           } // end addToPanel
    }
    }());
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    