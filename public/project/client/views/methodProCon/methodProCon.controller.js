(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("MethodProConController", MethodProConController);
	    
    function MethodProConController($routeParams, DecisionService, ProConService) { //$scope, $rootScope, $location
		
		//$scope.$location = $location;
		var model = this;
		model.createProCon = createProCon;
		model.deleteProCon = deleteProCon;
		model.selectProCon = selectProCon;
		model.updateProCon = updateProCon;
		model.calculateDecision = calculateDecision;
		
		var userId = $routeParams.userId;
		//console.log("userId in procon method");
		//console.log(userId);
		var decisionId = $routeParams.decisionId;
		//console.log("decisionId in procon method:");
		//console.log(decisionId);
		
		function init() {
			DecisionService.getDecision(decisionId).then(function(response){
				model.decision = response;
			});
			
			ProConService.getAllProCons(decisionId).then(function(response){
				model.procons = response;
			});
		}
		init()
		
		function createProCon(label, impact) {
			var newProCon = {
					"label" : label,
					"impact": impact
				}
				console.log("new ProCon");
				console.log(newProCon);
				ProConService.createProCon(decisionId, newProCon).then(function(response){
				model.procons = response;
				console.log("procons returned to controller:");
				console.log(response);
				});
		}
		
		function updateProCon(label, impact) {
			var proconId = model.selected.id;
			var procon = {	
				"id" : proconId,
				"label" : label,
				"impact": impact
			}
			console.log("selected procon id");
			console.log(model.selected.id);
			ProConService.updateProCon(decisionId, proconId, procon).then(function(response){
				model.procons = response;
			});
		}
		
		function deleteProCon(procon) {
			ProConService.deleteProCon(decisionId, procon.id).then(function(response){
				model.procons = response;
			});
		}
		
		function selectProCon(procon) {
			model.selected = procon;
			console.log("selected ProCon:");
			console.log(procon);
			console.log(model.selected.label);
			console.log(model.selected.impact);
		}
		
		function calculateDecision() {
			console.log("calculate Decision called in controller");
			console.log("decision id in controller results function");
			console.log(decisionId);
			ProConService.getProConResult(decisionId).then(function(response){
				model.decision = response;
				console.log("response in controller");
				console.log(response);
			});
			
		}
		
		
		
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
