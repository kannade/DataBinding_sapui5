sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./../model/formatter"
], function(Controller, Formatter) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.XmlModelView", {
		formatter: Formatter,
		onInit: function() {
			var oMdl = new sap.ui.model.xml.XMLModel();
			oMdl.loadData("model/products.xml");
			this.getView().setModel(oMdl);
		}
	});
});