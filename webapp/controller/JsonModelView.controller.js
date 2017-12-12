sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.JsonModelView", {
		onInit: function() {
			var oMdl = new sap.ui.model.json.JSONModel();
			oMdl.loadData("model/prod.json");
			this.getView().setModel(oMdl);
			this.changeTableBinding();
		},

		onSelList: function(oEvt) {
			this.changeTableBinding();
		},

		changeTableBinding: function() {
			var oList = this.getView().byId("__list0");
			var oItem = oList.getSelectedItem();
			var i = oItem ? oItem.getBindingContext().sPath.split("/")[2] : 0;

			var oTbl = this.getView().byId("table0");
			var oBindInfo = oTbl.getBindingInfo("items");

			if (!oBindInfo) {
				return;
			}
			oTbl.bindItems({
					path: "/stores/" + i + "/products",
					template: oBindInfo.template
				});
		}

	});

});