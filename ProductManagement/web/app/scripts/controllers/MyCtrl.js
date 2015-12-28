

(function(){
        angular
	     .module("productManagement")
         .controller('MyCtrl',  MyCtrl);
         
  
         function MyCtrl($scope,$http, WakandaManager) {

                     // Hide logout stuff
                     $('#logout').hide();
                     $('#ProductStore').hide();
                     $('#MyPanel').hide();
                     $('#newProduct').hide();

                     // WakandaManager
                     WakandaManager.ready().then(function () {      
                        var $wakanda = WakandaManager.$wakanda;
                        var ds = $wakanda.$ds;
                     }) 
               
                       // Login function
                    $scope.authenticate = function(user) {   // action of Submit button in Sign in section
	                      WakandaManager.$wakanda.$loginByPassword(user.login, user.pwd).then(function(loginResult){
	                      	
                            if(loginResult.result === true){
                               	
                                   window.location.assign("#/products");
                                  
                                    $('#logout').show();
                                    $('#ProductStore').show();
                                    $('#MyPanel').show();
                                    $('#newProduct').show();
                                    $('#Home').hide();
                                    
                                    // CREATE A NEW ENTITY IN DATASTORE IF DON'T EXIST FOR THE CURRENT USER
                                   WakandaManager.$wakanda.$ds.User.$query({
                                       filter: 'login = :1 ',
                                       params: [user.login]
                                              }).$promise.then(function (event) {
                                              	    var userArray = event.result;
                                              	    
                                                        if(userArray.length == 0){
	                                                           var newUser = WakandaManager.$wakanda.$ds.User.$create({
                                                                        login:  user.login,
                                                                        password: user.pwd,
                                                                            });
                                             
                                                                   newUser.$save().$promise.then(function () {
                                                                           });
                                                            }
                                               });
  
                            } else {
                                 $('#loginMsg').html("Login or password incorrect!");
                                 toastr.warning(' Login or password incorrect!');
                                }
                     	});
                          }  // end authenticate
                          
 
                     // logout      
                    $scope.logoutFct = function(){   
                               WakandaManager.$wakanda.$logout().$promise.then(function () {  	
                             });   
                           }
     
           } ; // MyCtrl
           
       }()); // IIFE