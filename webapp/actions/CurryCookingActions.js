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

		var curryCookingActions = ManagedObject.extend("sap.ui.demo.cooking.actions.CurryCookingActions", {
			metadata: {
				library: "sap.ui.demo.cooking",
				properties: {
					mainTask: {type: "object", group: "Behaviour", defaultValue: null},
				},
				events: {
					"slotBookingDone": {
						enableEventBubbling: true
					}
				}
			}
		});

		var rootContainer = sap.ui.core.Component.get("container-booking");
		processTasksActions.prototype.rb = rootContainer.getModel("i18n").getResourceBundle();
		processTasksActions.prototype.rootDataModel = rootContainer.getModel();

		processTasksActions.prototype._findTechniciansForTaskId = function (id) {
			var matchingTechnicians = this.rootDataModel.getData().technicians.filter(function (currTech) {
				if (currTech.tasks.indexOf(id) > -1) {
					return currTech;
				}
			});
			return matchingTechnicians;
		};
	}
);
