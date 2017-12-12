sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.ResourceModelView", {
		onShowMessage: function() {
			var aP = [];
			for (var i = 0; i <= 20; i++) {
				aP.push("0000000" + i);
			}

			var sMsg = sap.ui.getCore().getModel("i18n").getResourceBundle().getText("errorPernr", aP);
			jQuery.sap.getObject("sap.alfa.dataBinding", 0);
			if (sap.alfa.dataBinding) {
				sMsg += " " + sap.alfa.dataBinding.key1;
			}
			sap.m.MessageToast.show(sMsg);
		}
	});

});