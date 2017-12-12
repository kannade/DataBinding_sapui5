sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"./../model/transliteration"
], function(Controller, JSONModel, Translit) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.Formatting", {

		_data: {
			"floatVal": "121464562246.24893",
			"number": "987.741",
			"dateStr": "2001.01.24",
			"date": new Date(2001, 0, 24),
			"FileSize": 1024
		},

		onInit: function(evt) {
			var oModel = new JSONModel(this._data);
			this.getView().setModel(oModel);
			this.getView().setModel(new sap.ui.model.json.JSONModel({
				firstName: "Иван",
				lastName: "Иванов",
				midName: "Петрович"
			}), "inputData");
		},

		formatMail: function(sLastName, sFirstName, sMidName) {
			var sFirstNameTr = Translit.toLatin(sFirstName);
			var sLastNameTr = Translit.toLatin(sLastName);
			var sMidNameTr = Translit.toLatin(sMidName);

			return sap.m.URLHelper.normalizeEmail(
				sFirstNameTr.substring(0, 1) + sMidNameTr.substring(0, 1) + sLastNameTr + "@alfabank.ru",
				"Тема сообщения",
				"Тело письма");
		},
		
		formatIcon: function(sVal) {
			if (this.addStyleClass){
				this.addStyleClass("redIcon");
			}
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

	});

});