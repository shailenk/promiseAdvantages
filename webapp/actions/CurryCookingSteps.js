sap.ui.define([
		'sap/ui/base/ManagedObject',
		"sap/ui/thirdparty/jquery",
		"sap/m/Toolbar",
		"sap/m/ToolbarSpacer",
		"sap/m/Label",
		"sap/m/Dialog",
		"sap/m/Button",
		"sap/ui/model/json/JSONModel"
	],
	function (ManagedObject, jQuery, Toolbar, ToolbarSpacer, Label, Dialog, Button, JSONModel) {
		"use strict";

		var curryCookingActions = ManagedObject.extend("demo.app.cooking.actions.CurryCookingSteps", {
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
		curryCookingActions.prototype.cookTraditionally = function () {
			performance.clearMarks("begin");
			performance.mark("begin");
			this._washVeggies();
			this._cutVeggies();
			this._steamVeggies();
			this._precookSpices();
			this._mixAndCook();
			this._garnish();
		};

		curryCookingActions.prototype._washVeggies = function () {
			var that = this;
			performance.mark("_washVeggies");
			var to1 = setTimeout(function () {
				performance.mark("_washVeggies");
				var perf = performance.getEntriesByName("_washVeggies");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.washing"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_washVeggies");
				clearTimeout(to1);
			}, 200);
		};
		curryCookingActions.prototype._cutVeggies = function () {
			performance.mark("_cutVeggies");
			var that = this;
			var to1 = setTimeout(function () {
				performance.mark("_cutVeggies");
				var perf = performance.getEntriesByName("_cutVeggies");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.cutting"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_cutVeggies");
				clearTimeout(to1);
			}, 200);
		};

		curryCookingActions.prototype._steamVeggies = function () {
			performance.mark("_steamVeggies");
			var that = this;
			var to1 = setTimeout(function () {
				performance.mark("_steamVeggies");
				var perf = performance.getEntriesByName("_steamVeggies");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.steaming"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_steamVeggies");
				clearTimeout(to1);
			}, 200);
		};
		curryCookingActions.prototype._precookSpices = function () {
			performance.mark("_precookSpices");
			var that = this;
			var to1 = setTimeout(function () {
				performance.mark("_precookSpices");
				var perf = performance.getEntriesByName("_precookSpices");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.precookSpices"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_precookSpices");
				clearTimeout(to1);
			}, 200);
		};
		curryCookingActions.prototype._mixAndCook = function () {
			performance.mark("_mixAndCook");
			var that = this;
			var to1 = setTimeout(function () {
				performance.mark("_mixAndCook");
				var perf = performance.getEntriesByName("_mixAndCook");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.mixAndCook"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_mixAndCook");
				clearTimeout(to1);
			}, 200);
		};
		curryCookingActions.prototype._garnish = function () {
			performance.mark("_garnish");
			var that = this;
			var to1 = setTimeout(function () {
				performance.mark("_garnish");
				var perf = performance.getEntriesByName("_garnish");
				that.fireStepProcessed({
					"step": that.rb.getText("step.processed.garnish"),
					"duration": perf[1].startTime - perf[0].startTime,
					"absoluteTime": perf[1].startTime - performance.getEntriesByName("begin")[0].startTime
				});
				performance.clearMarks("_garnish");
				clearTimeout(to1);
			}, 200);
		};
	}
);
