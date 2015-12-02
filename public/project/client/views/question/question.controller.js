(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("QuestionController", QuestionController);
	    
    function QuestionController($scope, $rootScope, $location, $routeParams, DecisionService) {
		var model = this;
		$scope.$location = $location;
		model.gotoMethod = gotoMethod;
		
		var userId = $rootScope.user._id;

		
		
				
		/* Citations for help with radio buttons: 
		http://stackoverflow.com/questions/1423777/javascript-how-can-i-check-whether-a-radio-button-is-selected
		http://stackoverflow.com/questions/8681505/on-select-radio-redirect-to-a-link   */
		function gotoMethod(question) {	
			console.log("gotoMethod called");
			if(document.getElementById('RadioProCon').checked) {
				var ProConDecision = {
					"question" : question,
					"methodType": "ProCon"
				}
				DecisionService.createDecision(userId, ProConDecision).then(function(response){
				model.decision = response;
				console.log(response);
				var decisionId = model.decision._id;
				$location.path("/user/"+userId+"/decision/"+decisionId+"/ProCon");
				});
				
				//window.location = "#/methodProCon";
			}
			else if(document.getElementById('RadioGrid').checked) {
				var GridDecision = {
					"question" : question,
					"methodType": "Grid"
				}
				DecisionService.createDecision(userId, GridDecision).then(function(response){
				model.decision = response;
				console.log(response);
				$location.path("/methodGridOptions");
				});
				//window.location = "#/methodGridOptions";
			}
			else if(document.getElementById('RadioIntuition').checked) {
				var GuessDecision = {
					"question" : question,
					"methodType": "Guess"
				}
				DecisionService.createDecision(userId, GuessDecision).then(function(response){
				model.decision = response;
				console.log(response);
				var decisionId = model.decision._id;
				$location.path("/user/"+userId+"/decision/"+decisionId+"/IntuitionOptions");
				//$location.path("/methodIntuitionOptions");
				});
				//window.location = "#/methodIntuitionOptions";
			}
			else {
				alert("NO");
			}
		}
		
		} 
}) ();

