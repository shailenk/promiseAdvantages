sap.ui.jsview("sap.ui.demo.cooking.view.App", {
    getControllerName: function() {
        "use strict";
        return "sap.ui.demo.cooking.controller.App";
    },
    createContent: function(oController) {
        "use strict";
        var view = this;
        this.rb = this.getModel("i18n").getResourceBundle();
        function traditionalFuncitonHandler(){
        	var modelData = view.getModel().getData();
        	var traditionalDataLog = modelData.traditionalLogs;
        	if (!traditionalDataLog) {
				traditionalDataLog = [];
				modelData["traditionalLogs"] = traditionalDataLog;
			}
			traditionalDataLog.push({"name": "traditional handler","description":"traditional handler"});
			view.getModel().setData(modelData);
		}
		function promiseFuncitonsHandler(){
			var modelData = view.getModel().getData();
			var promiseDataLogs = modelData.promiseLogs;
			if (!promiseDataLogs) {
				promiseDataLogs = [];
				modelData["promiseLogs"] = promiseDataLogs;
			}
			promiseDataLogs.push({"name": "promise handler","description":"promise handler"});
			view.getModel().setData(modelData);
		}
		this.traditionalSplitPane = new sap.ui.layout.SplitPane({
			content: this.createCookingLog("Cooking functional in traditional way", traditionalFuncitonHandler, "traditionalLogs")
		});
		this.promiseSplitPane = new sap.ui.layout.SplitPane({
			content: this.createCookingLog("Cooking functional with Promises", promiseFuncitonsHandler, "promiseLogs")
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
    	var cookButton = new sap.m.Button({
			text: "Start cooking",
			press: btnPressListener
		});
		var logListItem = new sap.m.StandardListItem({
			title: "{name}",
			description: "{description}",
			iconDensityAware: false,
			iconInset: true
		});
    	var logList = new sap.m.List({
			headerText: "Cooking logs",
			items: {
				path: '/'+modelPath,
				template: logListItem
			}
		});
    	var panel = new sap.m.Panel({
			headerText: oHeaderTxt,
			content: [cookButton, logList]
		});

    	return panel;
	},
});
