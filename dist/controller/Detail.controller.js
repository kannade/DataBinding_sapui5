sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.Detail", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			
			var oTarget = oRouter.getTarget("detail");
			oTarget.attachDisplay(function (oEvent) {
				this._oData = oEvent.getParameter("data"); //store the data
				this.getView().bindElement({
					path: "EmpMdl>/Employees/" + this._oData.id 
				});
			}, this);
			
			// var oModel = new sap.ui.model.json.JSONModel();
			// oModel.loadData("./model/employees.json", "", false);
			// this.getView().setModel(oModel);
		},

		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "EmpMdl>/Employees/" + oEvent.getParameter("arguments").id 
			});
		},

		onNavBack : function(){
			// Вариант 2 без изменения адреса
			var oHistory, sPreviousHash, oRouter;
			// in some cases we could display a certain target when the back button is pressed
			if (this._oData && this._oData.fromTarget) {
				oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getTargets().display(this._oData.fromTarget);
				delete this._oData.fromTarget;
				return;
			}
			
			
			// Вариант 1 c изменением адреса
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", {}, true);
			}
		}

	});

});