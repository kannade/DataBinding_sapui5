sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./../model/formatter"
], function(Controller, Formatter) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.XmlModelView", {
		formatter : Formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf alfa.DataBindingExample.view.XmlModelView
		 */
		onInit: function() {
			var oMdl = new sap.ui.model.xml.XMLModel();
			oMdl.loadData("model/products.xml");
			this.getView().setModel(oMdl);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf alfa.DataBindingExample.view.XmlModelView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf alfa.DataBindingExample.view.XmlModelView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf alfa.DataBindingExample.view.XmlModelView
		 */
		//	onExit: function() {
		//
		//	}

	});

});