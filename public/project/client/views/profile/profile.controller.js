(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("ProfileController", ProfileController);
	    
    function ProfileController($scope, $rootScope, $location, UserService) {	
		$scope.$location = $location;
		var model = this;
		model.update = update;
		
		var currentUser = null;
		
		UserService.findGoogleUser().then(function(response){
			console.log("getting googleuser in profile controller");
			console.log(response);
			$rootScope.user = response;		
			
			// update fields to existing user
			currentUser = $rootScope.user;
			console.log("current user");
			console.log(currentUser);
		
			model.userName = currentUser.username;
			model.userFName = currentUser.firstName;
			model.userLName = currentUser.lastName;
			model.userEmail = currentUser.email;
			model.userPassword = currentUser.password;

		});

  		
	  	
		function update(userName, firstName, lastName, userEmail, userPassword) {
			console.log("updating user...")			
			
			var revisedUser = {
				"username" : userName,
				"password"  : userPassword,
				"email"  : userEmail,
				"firstName" : firstName,
				"lastName"  : lastName,
				"_id" : currentUser._id,
				"googleId" : currentUser.googleId
			}; 

			UserService.updateUser(currentUser._id, revisedUser).then(function(response){
				$rootScope.user = response;
				$location.path("/profile");
			});	
		}
	}
	
	
	
/*		$scope.update = update;
		
		// update fields to existing user
		var currentUser = $rootScope.user;
		$scope.userName = currentUser.username;
		$scope.userPassword = currentUser.password;
		$scope.userEmail = currentUser.email;
		$scope.userFName = currentUser.firstname;
		$scope.userLName = currentUser.lastname;
  
	  
	  	function callback(value) {
            console.log(value);
        }
	  	
		function update() {
			console.log("updating user...")			
			
			var revisedUser = {
				"username" : $scope.userName,
				"password"  : $scope.userPassword,
				"email"  : $scope.userEmail,
				"firstname" : $scope.userFName,
				"lastname"  : $scope.userLName,
				"id" : currentUser.id,
			}; 
			
			$rootScope.user = UserService.updateUser(currentUser.id, revisedUser, callback)
			$location.path("/profile")
		}   */
  
	
}) ();

