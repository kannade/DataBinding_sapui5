sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/TablePersoController',
	'../model/PersoService',
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter'
], function(Controller, TablePersoController, PersoService, Filter, Sorter) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.SortingAndFiltering", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf alfa.DataBindingExample.view.SortingAndFiltering
		 */
		onInit: function() {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("./model/employees.json", "", false);
			this.getView().byId("table0").setModel(oModel);
			sap.ui.getCore().setModel(oModel, "EmpMdl");
			
			this.mGroupFunctions = {
				OrgehName: function(oContext) {
					var name = oContext.getProperty("OrgehName");
					return {
						key: name,
						text: name
					};
				},
				City: function(oContext) {
					var name = oContext.getProperty("City");
					return {
						key: name,
						text: name
					};
				}
			};
		},

		onTableSearch: function(oEvt) {
			var aFilter = [],
				resFilter = [];
			var sQuery = oEvt.getParameter("query");
			jQuery.sap.require("sap.ui.model.Filter");
			if (sQuery) {
				aFilter.push(new sap.ui.model.Filter("LastName", sap.ui.model.FilterOperator.Contains, sQuery));
				aFilter.push(new sap.ui.model.Filter("FirstName", sap.ui.model.FilterOperator.Contains, sQuery));
				aFilter.push(new sap.ui.model.Filter("MidName", sap.ui.model.FilterOperator.Contains, sQuery));
				resFilter.push(new sap.ui.model.Filter({
					filters: aFilter,
					and: false
				}));
			}

			var oList = this.getView().byId("table0");
			var oBinding = oList.getBinding("items");
			oBinding.filter(new sap.ui.model.Filter(resFilter, true));
		},

		onViewSettings: function(oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("alfa.DataBindingExample.view.TableViewSettingsDialog", this);
				var oCols = this.getView().byId("table0").getColumns();
				var aCells = this.getView().byId("table0").getBindingInfo("items").template.getCells();

				for (var i = 0; i < oCols.length; i++) {
					this._oDialog.addSortItem(new sap.m.ViewSettingsItem({
						text: oCols[i].getHeader().getBindingInfo("text").binding.oValue,
						key: aCells[i].getBindingInfo(i === 4 ? "value" : "text").parts[0].path,
						selected: i === 0
					}));
				}
			}
			this._oDialog.open();
		},

		handleViewSettingsConfirm: function(oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("table0");

			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");

			// apply sorter to binding
			// (grouping comes before sorting)
			var sPath;
			var bDescending;
			var vGroup;
			var aSorters = [];
			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aSorters.push(new Sorter(sPath, bDescending, vGroup));
			}
			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));
			oBinding.sort(aSorters);

			// apply filters to binding
			var aFilters = [];
			jQuery.each(mParams.filterItems, function(i, oItem) {
				var aSplit = oItem.getKey().split("___");
				var sPath = aSplit[0];
				var sOperator = aSplit[1];
				var sValue1 = aSplit[2];
				var sValue2 = aSplit[3];
				var oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});
			oBinding.filter(aFilters);
		},
		
		comparePernr : function(s1, s2){
			var i1 = parseInt(s1);
			var i2 = parseInt(s2);
			return i1 > i2;
		}
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf alfa.DataBindingExample.view.SortingAndFiltering
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf alfa.DataBindingExample.view.SortingAndFiltering
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf alfa.DataBindingExample.view.SortingAndFiltering
		 */
		//	onExit: function() {
		//
		//	}

	});

});