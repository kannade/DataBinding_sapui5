sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.ModelAndInterface", {
		onInit: function() {
			// Ввод данных One-Way Data Binding vs Two-Way Data Binding
			var oData = {
				firstName: "Иван",
				lastName: "Иванов",
				midName: "Петрович"
			};

			var oMdl = new sap.ui.model.json.JSONModel(oData);
			// значение считывается из модели единственный раз
			// oMdl.setDefaultBindingMode(sap.ui.model.BindingMode.OneTime);
			// из модели данные передаются на view
			oMdl.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			// из модели данные передаются на view и из view обновляется модель
			// oMdl.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(oMdl, "inputData");
		},

		onRefreshMdl: function() {
			var oMdl = this.getView().getModel("inputData");
			var sFName = this.getView().byId("fName").getValue();
			var sLName = this.getView().byId("lName").getValue();
			var sMName = this.getView().byId("mName").getValue();
			oMdl.setData({
				firstName: sFName,
				lastName: sLName,
				midName: sMName
			});
		}
	});
});