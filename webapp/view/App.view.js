$.sap.require("demo.app.cooking.actions.CurryCookingActions",
	"demo.app.cooking.actions.CurryCookingSteps");
sap.ui.jsview("demo.app.cooking.view.App", {
    getControllerName: function() {
        "use strict";
        return "demo.app.cooking.controller.App";
    },
    createContent: function(oController) {
        "use strict";
        this.rb = this.getModel("i18n").getResourceBundle();
        this._traditioanlCookingModelPath = "traditionalLogs";
		this._promiseCookingModelPath = "promiseLogs";
		this._RbType_traditioanl_SimpleFnInvoke = "simpleFnInvoke";
		this._RbType_traditioanl_eventFnInvoke = "eventFnInvoke";
		this._RbType_promise_SimpleFnInvoke = "simplePromiseInvoke";
		this._RbType_promise_promptFnInvoke = "promptPromiseInvoke";
		this._RbType_promise_promptFnReject = "promptPromiseReject";
        this._promiseCookingActions = new demo.app.cooking.actions.CurryCookingActions();
		this._traditionalCookingSteps = new demo.app.cooking.actions.CurryCookingSteps();

		this.traditionalSplitPane = new sap.ui.layout.SplitPane({
			content: this.createCookingLog(this.rb.getText("cooking.way.traditional"), this._createTraditionalCookingHeader(), this._traditioanlCookingModelPath)
		});
		this.promiseSplitPane = new sap.ui.layout.SplitPane({
			content: this.createCookingLog(this.rb.getText("cooking.way.promise"), this._createPromiseCookingHeader(), this._promiseCookingModelPath)
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

	createCookingLog: function(oHeaderTxt, headerContent, modelPath){
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
			content: [headerContent, logList]
		});

    	return panel;
	},

	traditionalFuncitonHandler: function(){
    	var view = this;
		if(!this._traditionalHandlerAttached){
			this._traditionalHandlerAttached = true;
			this._traditionalCookingSteps.attachStepProcessed(function(oEvent){
				var modelData = view.getModel().getData();
				var traditionalLogs = modelData.traditionalLogs;
				if (!traditionalLogs) {
					traditionalLogs = [];
					modelData[view._traditioanlCookingModelPath] = traditionalLogs;
				}
				traditionalLogs.push({"name": oEvent.getParameter("step"),"description":this.rb.getText("performance.log.text",
						[oEvent.getParameter("duration"), oEvent.getParameter("absoluteTime")])});
				view.getModel().setData(modelData);
			});
		}
		if(this._selectedTraditionalOption === this._RbType_traditioanl_eventFnInvoke) {
			view._traditionalCookingSteps.cookTraditionallyInSequence();
		}else{
			this._traditionalCookingSteps.cookTraditionally();
		}
	},

	promiseFuncitonsHandler: function(){
    	var view = this;
		if(!this._promiseHandlerAttached){
			this._promiseHandlerAttached = true;
			this._promiseCookingActions.attachStepProcessed(function(oEvent){
				var modelData = view.getModel().getData();
				var promiseDataLogs = modelData.promiseLogs;
				if (!promiseDataLogs) {
					promiseDataLogs = [];
					modelData[view._promiseCookingModelPath] = promiseDataLogs;
				}
				promiseDataLogs.push({"name": oEvent.getParameter("step"),"description":this.rb.getText("performance.log.text",
						[oEvent.getParameter("duration"), oEvent.getParameter("absoluteTime")])});
				view.getModel().setData(modelData);
			});
		}
		if(this._selectedPromiseOption === this._RbType_promise_promptFnInvoke){
			this._promiseCookingActions.cookWithPromisesWithPrompt();
		}else if(this._selectedPromiseOption === this._RbType_promise_promptFnReject){
			this._promiseCookingActions.cookWithPromisesWithRejectionPrompt().then(function(){}, function(error){
					sap.m.MessageBox.information(
						view.rb.getText("message.cookingNotAccepted.clear.txt"),{
							onClose: function(){
								view.resetModelLogs(view._promiseCookingModelPath);
							}
						}
					);
				});
		}else{
			this._promiseCookingActions.cookWithPromises();
		}
	},

	_createTraditionalCookingHeader: function(){
    	function selectHandler(oEvent){
			this._selectedTraditionalOption = oEvent.getSource().getCustomData()[0].getKey();
			this.resetModelLogs(this._traditioanlCookingModelPath);
		}
		var vBox = new sap.m.VBox({
			items: [
				new sap.m.Button({
					text: this.rb.getText("action.start.cooking"),
					press: [this.traditionalFuncitonHandler, this]
				}),
				new sap.m.RadioButton({
					groupName:'traditionalOptions',
					selected: true,
					text: 'Cook by simply invoking functions',
					customData: [new sap.ui.core.CustomData({key: this._RbType_traditioanl_SimpleFnInvoke})],
					select: [selectHandler, this]
				}),
				new sap.m.RadioButton({
					groupName:'traditionalOptions',
					selected: false,
					text: 'Cook by maintaining the flow',
					customData: [new sap.ui.core.CustomData({key: this._RbType_traditioanl_eventFnInvoke})],
					select: [selectHandler, this]
				})
			]
		});

		var resetLogs = new sap.m.Button({
			text: this.rb.getText("action.reset.logs"),
			press: function(){
				this.resetModelLogs(this._traditioanlCookingModelPath);
			}.bind(this)
		});

		var buttonBox = new sap.m.HBox({
			items: [vBox, resetLogs],
			justifyContent: sap.m.FlexJustifyContent.SpaceBetween
		});

		return buttonBox;
	},

	_createPromiseCookingHeader: function(){
		function selectHandler(oEvent){
			this._selectedPromiseOption = oEvent.getSource().getCustomData()[0].getKey();
			this.resetModelLogs(this._promiseCookingModelPath);
		}
		var vBox = new sap.m.VBox({
			items: [
				new sap.m.Button({
					text: this.rb.getText("action.start.cooking"),
					press: [this.promiseFuncitonsHandler, this]
				}),
				new sap.m.RadioButton({
					groupName:'promiseOptions',
					selected: true,
					text: 'Normal promise based cooking',
					customData: [new sap.ui.core.CustomData({key: this._RbType_promise_SimpleFnInvoke})],
					select: [selectHandler, this]
				}),
				new sap.m.RadioButton({
					groupName:'promiseOptions',
					selected: false,
					text: 'Version 2 of promise cooking, add garnish option',
					customData: [new sap.ui.core.CustomData({key: this._RbType_promise_promptFnInvoke})],
					select: [selectHandler, this]
				}),
				new sap.m.RadioButton({
					groupName:'promiseOptions',
					selected: false,
					text: 'Sample show how the whole transaction can be rolled back',
					customData: [new sap.ui.core.CustomData({key: this._RbType_promise_promptFnReject})],
					select: [selectHandler, this]
				})
			]
		});

		var resetLogs = new sap.m.Button({
			text: this.rb.getText("action.reset.logs"),
			press: function(){
				this.resetModelLogs(this._promiseCookingModelPath);
			}.bind(this)
		});

		var buttonBox = new sap.m.HBox({
			items: [vBox, resetLogs],
			justifyContent: sap.m.FlexJustifyContent.SpaceBetween
		});

		return buttonBox;
	},

	resetModelLogs: function(modelPath){
		var logData = this.getModel().getData();
		delete logData[modelPath];
		this.getModel().setData(logData);
	}
});
