sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.JsonModelView", {
		onInit: function() {
			var oMdl = new sap.ui.model.json.JSONModel();
			oMdl.loadData("model/prod.json");
			this.getView().setModel(oMdl);
		},
		
		onSelList : function(oEvt){
			var i = oEvt.getParameter("listItem").getBindingContext().sPath.split("/")[2];
			if (i){
				this.changeTableBinding();
			}
		},
		
		changeTableBinding : function(){
			var oList = this.getView().byId("__list0");
			var oItem = oList.getSelectedItem();
			var i = oItem ? oItem.getBindingContext().sPath.split("/")[2] : 1;
			
			var oTbl = this.getView().byId("table0");
			var oBindInfo = oTbl.getBindingInfo("items");
			
			if (oBindInfo) {
				oTbl.bindItems({
					path 	 : "/stores/" + i + "/products", // oBindInfo.path, 
					template : oBindInfo.template
					// filters  : new sap.ui.model.Filter("orgeh", sap.ui.model.FilterOperator.EQ, sOrgeh)
				});
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf alfa.DataBindingExample.view.JsonModelView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf alfa.DataBindingExample.view.JsonModelView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf alfa.DataBindingExample.view.JsonModelView
		 */
		//	onExit: function() {
		//
		//	}

	});

});