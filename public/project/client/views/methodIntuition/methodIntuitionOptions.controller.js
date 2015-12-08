(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("MethodIntuitionOptionsController", MethodIntuitionOptionsController);
	    
    function MethodIntuitionOptionsController($routeParams, DecisionService, IntuitionService) {  //$scope, $rootScope, $location,
		var model = this;
		model.createOption = createOption;
		model.updateOption = updateOption;
		model.deleteOption = deleteOption;
		model.selectOption = selectOption;
		
		var userId = $routeParams.userId;
		console.log("userId in intuition-options method");
		console.log(userId);
		var decisionId = $routeParams.decisionId;
		console.log("decisionId in intuition-options method:");
		console.log(decisionId);
		
		
		function init() {
			DecisionService.getDecision(decisionId).then(function(response){
				model.decision = response;
			});
			
			IntuitionService.getAllOptions(decisionId).then(function(response){
				model.options = response;
			});
		}
		init()
		
		function createOption(name, description, url) {
			var newOption = {
					"label" : name,
					"description": description,
					"url": url
				}
				console.log("new Guess Option url");
				console.log(url);
				IntuitionService.createOption(decisionId, newOption).then(function(response){
				model.options = response;
				console.log("options returned to controller:");
				console.log(response);
				model.selected = null;
				});
		}
		
		function updateOption(name, description, url) {
			var optionId = model.selected._id;
			var option = {	
				"_id" : optionId,
				"label" : name,
				"description": description,
				"url" : url
			}
			console.log("update option id");
			console.log(model.selected._id);
			IntuitionService.updateOption(decisionId, optionId, option).then(function(response){
				console.log("update option response");
				console.log(response);
				
				IntuitionService.getAllOptions(decisionId).then(function(response){
				model.options = response;
				model.selected = null;
				});
			});
		}
		
		function deleteOption(option) {
			IntuitionService.deleteOption(decisionId, option._id).then(function(response){
				console.log(response);
				
				IntuitionService.getAllOptions(decisionId).then(function(response){
				model.options = response;
				model.selected = null;
				});
			});
		}
		
		function selectOption(option) {
			if(option == model.selected){
				model.selected = null;
			} else{
				model.selected = option;
				console.log("selected Option:");
				console.log(option);
			}
		}
		
		
		
		//$scope.$location = $location;
		
/*		function callback(value) {
            console.log(value);
        }
			
		var currentUser = $rootScope.user;		
		$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		var currentFormId = null
		
		$scope.addForm = addForm;
		$scope.updateForm = updateForm;
		$scope.deleteForm = deleteForm;
		$scope.selectForm = selectForm;   
		

		
		function addForm() {
			var newForm = {
				"name" : $scope.formName,
			}; 
			FormService.createFormForUser($rootScope.user.id, newForm, callback);
			$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		}
		
		
		function updateForm() {
			var newForm = {
				"name" : $scope.formName,
				"id" : currentFormId,
				"userid" : currentUser.id,		
			};
			FormService.updateFormById(currentFormId, newForm, callback);
			$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
			console.log($scope.forms);
		}   
		
		
		function deleteForm(index) {
			$scope.selectedFormIndex = index;
			var formid = $scope.forms[index].id
			FormService.deleteFormById(formid, callback)
			$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		}
		
		
		function selectForm(index) {
			$scope.selectedFormIndex = index;
			var formid = $scope.forms[index].id;
			currentFormId = formid
			$scope.formName = $scope.forms[index].name;  
		}  */
		} 
}) ();

