sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.ResourceModelView", {
		onShowMessage: function() {
			var aP = [];
			for (var i = 0; i <= 20; i++) {
				aP.push("000000" + i);
			}

			var sMsg = sap.ui.getCore().getModel("i18n").getResourceBundle().getText("errorPernr", aP);
			jQuery.sap.getObject("sap.alfa.dataBinding", 0);
			if (sap.alfa.dataBinding) {
				sMsg += " " + sap.alfa.dataBinding.key1;
			}
			sap.m.MessageToast.show(sMsg);
		}
		
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf alfa.DataBindingExample.view.ResourceModelView
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf alfa.DataBindingExample.view.ResourceModelView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf alfa.DataBindingExample.view.ResourceModelView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf alfa.DataBindingExample.view.ResourceModelView
		 */
		//	onExit: function() {
		//
		//	}

	});

});