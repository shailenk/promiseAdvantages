$.sap.require("demo.app.cooking.actions.CurryCookingActions",
	"demo.app.cooking.actions.CurryCookingSteps");
sap.ui.jsview("demo.app.cooking.view.App", {
    getControllerName: function() {
        "use strict";
        return "demo.app.cooking.controller.App";
    },
    createContent: function(oController) {
        "use strict";
        var view = this;
        this.rb = this.getModel("i18n").getResourceBundle();
        this._promiseCookingActions = new demo.app.cooking.actions.CurryCookingActions();
		this._traditionalCookingSteps = new demo.app.cooking.actions.CurryCookingSteps();
        function traditionalFuncitonHandler(){
			if(!view._traditionalHandlerAttached){
				view._traditionalHandlerAttached = true;
				view._traditionalCookingSteps.attachStepProcessed(function(oEvent){
					var modelData = view.getModel().getData();
					var traditionalLogs = modelData.traditionalLogs;
					if (!traditionalLogs) {
						traditionalLogs = [];
						modelData["traditionalLogs"] = traditionalLogs;
					}
					traditionalLogs.push({"name": oEvent.getParameter("step"),"description":"TIme taken to execute: "+
							oEvent.getParameter("duration")+" and ended at: "+oEvent.getParameter("absoluteTime")});
					view.getModel().setData(modelData);
				});
			}
			view._traditionalCookingSteps.cookTraditionally();
		}

		function promiseFuncitonsHandler(){
			if(!view._promiseHandlerAttached){
				view._promiseHandlerAttached = true;
				view._promiseCookingActions.attachStepProcessed(function(oEvent){
					var modelData = view.getModel().getData();
					var promiseDataLogs = modelData.promiseLogs;
					if (!promiseDataLogs) {
						promiseDataLogs = [];
						modelData["promiseLogs"] = promiseDataLogs;
					}
					promiseDataLogs.push({"name": oEvent.getParameter("step"),"description":"TIme taken to execute: "+
							oEvent.getParameter("duration")+" and ended at: "+oEvent.getParameter("absoluteTime")});
					view.getModel().setData(modelData);
				});
			}
			view._promiseCookingActions.cookWithPromises();
		}
		this.traditionalSplitPane = new sap.ui.layout.SplitPane({
			content: this.createCookingLog(this.rb.getText("cooking.way.traditional"), traditionalFuncitonHandler, "traditionalLogs")
		});
		this.promiseSplitPane = new sap.ui.layout.SplitPane({
			content: this.createCookingLog(this.rb.getText("cooking.way.promise"), promiseFuncitonsHandler, "promiseLogs")
		});
		var panelContainer = new sap.ui.layout.PaneContainer({
			panes: [this.traditionalSplitPane, this.promiseSplitPane]
		});
        var splitter = new sap.ui.layout.ResponsiveSplitter({
			defaultPane: "default",
			rootPaneContainer: panelContainer
		});

        var shell = new sap.m.Shell({
            app: splitter
        });
        return shell;
    },

	createCookingLog: function(oHeaderTxt, btnPressListener, modelPath){
    	var that = this;
    	var cookButton = new sap.m.Button({
			text: this.rb.getText("action.start.cooking"),
			press: btnPressListener
		});
    	var resetLogs = new sap.m.Button({
			text: this.rb.getText("action.reset.logs"),
			press: function(){
				var logData = that.getModel().getData();
				delete logData[modelPath];
				that.getModel().setData(logData);
			}
		});
    	var buttonBox = new sap.m.HBox({
			items: [cookButton, resetLogs],
			justifyContent: sap.m.FlexJustifyContent.SpaceBetween
		});
		var logListItem = new sap.m.StandardListItem({
			title: "{name}",
			description: "{description}",
			iconDensityAware: false,
			iconInset: true
		});
    	var logList = new sap.m.List({
			headerText: this.rb.getText("list.header.cooking"),
			items: {
				path: '/'+modelPath,
				template: logListItem
			}
		});
    	var panel = new sap.m.Panel({
			headerText: oHeaderTxt,
			content: [buttonBox, logList]
		});

    	return panel;
	},
});
