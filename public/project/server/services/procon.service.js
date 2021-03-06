//var model = require("../models/decision.model.js")();

module.exports = function(app, model) {
	app.post("/api/decision/:decisionId/procon", createProCon);
	app.get("/api/decision/:decisionId/procon", getAllProCons);
	app.get("/api/decision/:decisionId/procon/:id", getProCon);
	app.get("/api/decision/:decisionId/proconResult", getProConResult);
	app.put("/api/decision/:decisionId/procon/:id", updateProCon);
	app.delete("/api/decision/:decisionId/procon/:id", deleteProCon);
	
	
	function createProCon(req, res) {
		//console.log("create procon in procon.service");
		var decisionId = req.params.decisionId;
		var procon = req.body;
		model.createProCon(decisionId, procon).then(function(procons){
			res.json(procons);
            });
		//res.json(model.createProCon(decisionId, procon));
	}
	
	function getAllProCons(req, res) {
		var decisionId = req.params.decisionId;
		model.getAllProCons(decisionId).then(function(procons){
			res.json(procons);
            });
		//res.json(model.getAllProCons(decisionId));		
	}
	
	function getProCon(req, res) {
		var decisionId = req.params.decisionId;
		var id = req.params.id;
		model.getProCon(decisionId, id).then(function(procon){
			res.json(procon);
            });
		//res.json(model.getProCon(decisionId, id));
	}
	
	function getProConResult(req, res) {
		console.log("getting procon result in procon.service");
		var decisionId = req.params.decisionId;
		model.getProConResult(decisionId).then(function(result){
			res.json(result);
            });
		//res.json(model.getProConResult(decisionId));
	}
	
	function updateProCon(req, res) {
		var decisionId = req.params.decisionId;
		var id = req.params.id;
		var procon = req.body;
		model.updateProCon(decisionId, id, procon).then(function(status){
					res.json(status);
            });
		//res.json(model.updateProCon(decisionId, id, procon));
	}
	
	function deleteProCon(req, res) {
		var decisionId = req.params.decisionId;
		var id = req.params.id;
		model.deleteProCon(decisionId, id).then(function(status){
					res.json(status);
            });
		//res.json(model.deleteProCon(decisionId, id));
	}
}