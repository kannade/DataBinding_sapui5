sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"./../model/transliteration",
	"../model/formatter"
], function(Controller, JSONModel, Translit, Formatter) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.Formatting", {
		formatter: Formatter,
		
		_data : {
			"floatVal"	: "121464562246.24893",
			"number" : "987.741",
			"dateStr"   : "2001.01.24",
			"date"		: new Date(2001, 3, 21),
			"FileSize"	: 1024
		},
		
		onInit : function (evt) {
			var oModel = new JSONModel(this._data);
			this.getView().setModel(oModel);
		},
		
		formatMail: function(sLastName, sFirstName, sMidName) {
			var oMdl = sap.ui.getCore().getModel("i18n");
			if (!oMdl) {
				return;
			}

			var sFirstNameTr = Translit.toLatin(sFirstName);
			var sLastNameTr = Translit.toLatin(sLastName);
			var sMidNameTr = Translit.toLatin(sMidName);

			var oBundle = oMdl.getResourceBundle();
			return sap.m.URLHelper.normalizeEmail(
				sFirstNameTr.substring(0, 1) + sMidNameTr.substring(0, 1) + sLastNameTr + "@alfabank.ru",
				oBundle.getText("mailSubject", [sFirstName]),
				oBundle.getText("mailBody"));
		}
	});

});