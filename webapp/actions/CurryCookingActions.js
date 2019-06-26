sap.ui.define([
		'sap/ui/base/ManagedObject',
		"sap/ui/thirdparty/jquery",
		"sap/m/MessageBox",
		"sap/m/MessageToast",
		"sap/ui/model/json/JSONModel"
	],
	function (ManagedObject, jQuery, MessageBox, MessageToast, JSONModel) {
		"use strict";

		var curryCookingActions = ManagedObject.extend("demo.app.cooking.actions.CurryCookingActions", {
			metadata: {
				library: "demo.app.cooking",
				properties: {
					mainTask: {type: "object", group: "Behaviour", defaultValue: null},
				},
				events: {
					"stepProcessed": {
						enableEventBubbling: true
					}
				}
			}
		});

		var rootContainer = sap.ui.core.Component.get("container-cooking");
		curryCookingActions.prototype.rb = rootContainer.getModel("i18n").getResourceBundle();
		curryCookingActions.prototype.rootDataModel = rootContainer.getModel();
		curryCookingActions.prototype.cookWithPromises = function () {
			var that = this;
			performance.clearMarks("begin");
			performance.mark("begin");
			function failHandler(errObj) {
				console.error("Some error occurred: " + errObj);
			}

			this._washVeggies().then(function (doneObj) {
				that._cutVeggies().then(function (doneObj) {
					$.when(that._steamVeggies(), that._precookSpices()).then(function (steamDone, precookSpiceDone) {
						that._mixAndCook().then(function(){
							that._garnish().then(function(){
								console.log("last step done");
							}), failHandler
						}), failHandler
					}), failHandler
				}), failHandler
			}), failHandler
		};
		curryCookingActions.prototype.cookWithPromisesWithPrompt = function () {
			var that = this;
			performance.clearMarks("begin");
			performance.mark("begin");
			function failHandler(errObj) {
				console.error("Some error occurred: " + errObj);
			}

			this._washVeggies().then(function (doneObj) {
				that._cutVeggies().then(function (doneObj) {
					$.when(that._steamVeggies(), that._precookSpices()).then(function (steamDone, precookSpiceDone) {
						that._mixAndCook().then(function(){
							that._garnishWithConfirmation().then(function(){
								console.log("last step done");
							}), failHandler
						}), failHandler
					}), failHandler
				}), failHandler
			}), failHandler
		};

		curryCookingActions.prototype.cookAllAtOnce = function () {
			performance.clearMarks("begin");
			performance.mark("begin");

			$.when(this._washVeggies(), this._cutVeggies(), this._steamVeggies(), this._precookSpices(), this._mixAndCook(), this._garnish())
				.then(function (oWash, oCut, oSteam, oPreCookSpices, oMixAndCook, oGarnish) {
					console.log("All done at once");
				});
		};

		curryCookingActions.prototype._washVeggies = function () {
			performance.mark("_washVeggies");
			var deferred = new $.Deferred(), that = this;
			var to1 = setTimeout(function () {
				performance.mark("_washVeggies");
				var perf = performance.getEntriesByName("_washVeggies");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.washing"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_washVeggies");
				deferred.resolve();
				clearTimeout(to1);
			}, 200);
			return deferred.promise();
		};
		curryCookingActions.prototype._cutVeggies = function () {
			performance.mark("_cutVeggies");
			var deferred = new $.Deferred(), that = this;
			var to1 = setTimeout(function () {
				performance.mark("_cutVeggies");
				var perf = performance.getEntriesByName("_cutVeggies");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.cutting"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_cutVeggies");
				deferred.resolve();
				clearTimeout(to1);
			}, 200);
			return deferred.promise();
		};
		curryCookingActions.prototype._steamVeggies = function () {
			performance.mark("_steamVeggies");
			var deferred = new $.Deferred(), that = this;
			var to1 = setTimeout(function () {
				performance.mark("_steamVeggies");
				var perf = performance.getEntriesByName("_steamVeggies");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.steaming"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_steamVeggies");
				deferred.resolve();
				clearTimeout(to1);
			}, 200);
			return deferred.promise();
		};
		curryCookingActions.prototype._precookSpices = function () {
			performance.mark("_precookSpices");
			var deferred = new $.Deferred(), that = this;
			var to1 = setTimeout(function () {
				performance.mark("_precookSpices");
				var perf = performance.getEntriesByName("_precookSpices");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.precookSpices"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_precookSpices");
				deferred.resolve();
				clearTimeout(to1);
			}, 200);
			return deferred.promise();
		};
		curryCookingActions.prototype._mixAndCook = function () {
			performance.mark("_mixAndCook");
			var deferred = new $.Deferred(), that = this;
			var to1 = setTimeout(function () {
				performance.mark("_mixAndCook");
				var perf = performance.getEntriesByName("_mixAndCook");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.mixAndCook"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_mixAndCook");
				deferred.resolve();
				clearTimeout(to1);
			}, 200);
			return deferred.promise();
		};
		curryCookingActions.prototype._garnish = function () {
			performance.mark("_garnish");
			var deferred = new $.Deferred(), that = this;
			var to1 = setTimeout(function () {
				performance.mark("_garnish");
				var perf = performance.getEntriesByName("_garnish");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.garnish"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_garnish");
				deferred.resolve();
				clearTimeout(to1);
			}, 200);
			return deferred.promise();
		};
		curryCookingActions.prototype._garnishWithConfirmation = function () {
			performance.mark("_garnish");
			var deferred = new $.Deferred(), that = this;
			function completeGarnish(){
				MessageBox.confirm(
					that.rb.getText("message.garnish.confirm.txt"),{
						onClose: function(sAction){
							if(sAction === MessageBox.Action.OK){
								performance.mark("_garnish");
								var perf = performance.getEntriesByName("_garnish");
								that.fireStepProcessed({
									"step": that.rb.getText("step.processed.garnish"),
									"duration": perf[1].startTime - perf[0].startTime,
									"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
								});
								performance.clearMarks("_garnish");
								deferred.resolve();
							}else{
								var innerTo1 = setTimeout(function(){
									completeGarnish();
									clearTimeout(innerTo1);
								}, 200);
							}
						}
					}
				);
			}
			var to1 = setTimeout(function () {
				completeGarnish();
				clearTimeout(to1);
			}, 200);
			return deferred.promise();
		};
	}
);
