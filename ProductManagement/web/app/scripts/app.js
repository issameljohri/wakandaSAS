(function(){
	
	'use strict';
	
     var app = angular.module('productManagement', ['wakanda', 'ui.router'])
     
        app.service('WakandaManager', function($q, $wakanda) {
           var _this = this;
           var initPromise = $wakanda.init();
            
           this.$wakanda = $wakanda;

           this.ready = function() {
              var deferred = $q.defer();

              initPromise
                 .then(function() {
                     deferred.resolve(_this);
                  })


           return deferred.promise;
            };
            })

      
        app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider, $stateParams ){
     	
                var routeResolver = {
                        app: ['$wakanda', function($wakanda) {
                                 return $wakanda.init();
                              }]
                              };
     	
     	       $urlRouterProvider.otherwise("/");
     	           
     	           $stateProvider
     	             
     	               .state("login", {
     	           	    url: "/",
     	           	    templateUrl: "views/login.html",
     	           	    controller: "MyCtrl",
     	           	    resolve: routeResolver
     	                })
     	               
     	                .state("productList", {
     	           	    url: "/products",
     	           	    templateUrl: "views/productListView.html",
     	           	    controller: "ProductListCtrl as vm"
     	                })
     	               
     	               .state("panel", {
     	           	    url: "/panel",
     	           	    templateUrl: "views/panelView.html",
     	           	    controller: "PanelCtrl"
     	                })
     	               
     	                .state("newProduct", {
     	           	    url: "/newProduct",
     	           	    templateUrl: "views/newProductView.html",
     	           	    controller: "NewProductCtrl"
     	                })	
     }]);
}())
