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

		var curryCookingSteps = ManagedObject.extend("demo.app.cooking.actions.CurryCookingSteps", {
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
		curryCookingSteps.prototype.rb = rootContainer.getModel("i18n").getResourceBundle();
		curryCookingSteps.prototype.rootDataModel = rootContainer.getModel();
		curryCookingSteps.prototype.cookTraditionallyInSequence = function () {
			performance.clearMarks("begin");
			performance.mark("begin");
			this._currIndex = 0;
			var that = this;
			if(!this._attachedStepListener) {
				this.attachStepProcessed(function () {
					if(that._currIndex < that.stepExecutionSequence.length - 1){
						that._currIndex = that._currIndex + 1;
						that.stepExecutionSequence[that._currIndex].call(this);
					}
				});
				this._attachedStepListener = true;
			}
			this.stepExecutionSequence[this._currIndex].call(this);
		};

		curryCookingSteps.prototype.cookTraditionally = function () {
			performance.clearMarks("begin");
			performance.mark("begin");
			this._washVeggies();
			this._cutVeggies();
			this._steamVeggies();
			this._precookSpices();
			this._mixAndCook();
			this._garnish();
		};

		curryCookingSteps.prototype._washVeggies = function () {
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
		curryCookingSteps.prototype._cutVeggies = function () {
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

		curryCookingSteps.prototype._steamVeggies = function () {
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
		curryCookingSteps.prototype._precookSpices = function () {
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
		curryCookingSteps.prototype._mixAndCook = function () {
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
		curryCookingSteps.prototype._garnish = function () {
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
		curryCookingSteps.prototype.stepExecutionSequence = [curryCookingSteps.prototype._washVeggies,
			curryCookingSteps.prototype._cutVeggies,
			curryCookingSteps.prototype._steamVeggies,
			curryCookingSteps.prototype._precookSpices,
			curryCookingSteps.prototype._mixAndCook,
			curryCookingSteps.prototype._garnish
		];
	}
);
