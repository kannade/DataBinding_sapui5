sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"alfa/DataBindingExample/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("alfa.DataBindingExample.Component", {

		metadata: {
			manifest: "json"
		},
		
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			// Resource Model i18n
			var oResourceModel = new sap.ui.model.resource.ResourceModel({
				bundleName : "alfa.DataBindingExample.i18n.i18n"
			});
			
	    	// Устанавливаем для ядра с именем i18n
			sap.ui.getCore().setModel(oResourceModel, "i18n");
			
			// инициализация роутера
			// this.getRouter().initialize();
		}
	});
});