(function() {

    angular
        .module("productManagement")
        .controller('PanelCtrl', PanelCtrl);

    function PanelCtrl($scope, WakandaManager) {

        // return the currentUser 
        WakandaManager.$wakanda.$currentUser().$promise.then(function(event) {
            var currentUser = event.result;
            
            
            // search for currentUser ID 
            WakandaManager.$wakanda.$ds.User.$query({
                filter: 'login = :1 ',
                params: [currentUser.userName]
            }).$promise.then(function(event) {
                var userArray = event.result; // $query() return an array 
                var theUser = userArray[0];
                
                // retrieve user's Panel
                WakandaManager.$wakanda.$ds.UserPanel.$query({
                    filter: 'userID = :1 ',
                    params: [theUser.ID]
                }).$promise.then(function(event) {
                    var result = event.result;
                    var taille = result.length;
                    var products = [];
                    $scope.prods = [] ;
                    var theProduct = {};
                    
                    // Retrieve products belonging to user panel
                    for (var i = 0; i < taille; i++) {

                        productID = result[i].productID;
                        
                        WakandaManager.$wakanda.$ds.Product.$query({
                            filter: 'ID = :1 ',
                            params: [productID]
                        }).$promise.then(function(event) {
                            var OneProduct = event.result;
                            theProduct = OneProduct[0];
                            
                              // push the products one by one in the scope 
                            $scope.prods.push(theProduct);
                        });
                    } // for
                    
                });
               });
               
        }); // end currentUser
        
    }; // end PanelCtrl


}());