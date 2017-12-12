sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./../model/transliteration",
	"sap/ui/model/FilterOperator",
	"./../model/formatter"
], function(Controller, Translit, FilterOperator, Formatter) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.Main", {
		formatter: Formatter,
		onInit: function() {
			// Resource Model i18n
			var oResourceModel = new sap.ui.model.resource.ResourceModel({
				bundleName: "alfa.DataBindingExample.i18n.i18n"
			});

			// Устанавливаем для ядра с именем i18n
			sap.ui.getCore().setModel(oResourceModel, "i18n");

			var oData = {
				greetingText: "Вариант 1",
				greetingText2: "Вариант 2",
				greetingText3: "Вариант 3",

				result: {
					education: [{
						iconId: "sap-icon://official-service",
						typeId: "07",
						type: "Среднее",
						name: "Школа №1",
						graduateDate: new Date(1993, 0, 12),
						hasColor: false
					}, {
						iconId: "sap-icon://official-service",
						typeId: "19",
						type: "Послевузовское",
						name: "Российский университет кооперации Москва",
						qual: "экономист",
						spec: "Финансы и кредит",
						graduateDate: new Date(2012, 5, 15),
						hasColor: true
					}, {
						iconId: "sap-icon://official-service",
						typeId: "18",
						type: "Высшее",
						name: "КГТУ им Кирова",
						qual: "Инженер",
						spec: "Конструирование изделий из кожи",
						graduateDate: new Date(1998, 5, 15),
						hasColor: false
					}]
				},
				showTable: false
			};

			var oMdl = new sap.ui.model.json.JSONModel(oData);

			// Вариант 1 установить модель напрямую для элемента
			this.getOwnerComponent().byId("MainViewId").byId("__text4").setModel(oMdl);
			sap.ui.getCore().byId("__component0---MainViewId--__text4").setModel(oMdl);

			// Вариант 2 установить модель для всего view
			// this.getOwnerComponent().byId("MainViewId").setModel(oMdl);
			this.getView().setModel(oMdl);

			// Вариант 3 установить модель с определенным именем
			sap.ui.getCore().setModel(oMdl, "globalData");

			// Получение модели
			// Вариант 1, 2
			var oElem = this.getOwnerComponent().byId("MainViewId").byId("__text4");
			var oResData = oElem.getModel().getData();

			// Вариант 3
			var oMdl3 = sap.ui.getCore().getModel("globalData");
			var oResVar3 = oMdl3.getData();

			// Ввод данных One-Way Data Binding vs Two-Way Data Binding
			var oData = {
				firstName: "Иванов",
				lastName: "Иван",
				midName: "Петрович"
			};

			var oMdl = new sap.ui.model.json.JSONModel(oData);
			// oMdl.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			// oMdl.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			// oMdl.setDefaultBindingMode(sap.ui.model.BindingMode.OneTime);

			this.getView().setModel(oMdl, "inputData");
			// sap.ui.getCore().setModel(oMdl, "inputData");

			
			// Использование глобальных данных
			jQuery.sap.getObject("sap.alfa.dataBinding", 0);
			sap.alfa.dataBinding = {
				key1: "global value"
			};
		},

		formatDate: function(oVal) {
			return oVal.getFullYear();
		},

		formatIcon: function(sVal) {
			switch (sVal) {
				case "07":
					var rVal = "sap-icon://official-service";
					break;
				case "18":
					rVal = "sap-icon://study-leave";
					break;
				case "19":
					rVal = "sap-icon://education";
					break;
				default:
			}

			return rVal;
		},

		onDtlTbl: function(oEvt) {
			var oItem = oEvt.getSource();
			var sPath = oItem.getBindingContext().sPath.split("/")[2];

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// навигация
			oRouter.navTo("detail", {
				id: sPath
			});

			// без изменения строки адреса
			// oRouter.getTargets().display("detail", { fromTarget : "overview", id : sPath });
		}
	});
});