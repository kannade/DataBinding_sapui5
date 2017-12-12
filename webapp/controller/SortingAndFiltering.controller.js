sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter'
], function(Controller, Filter, Sorter) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.SortingAndFiltering", {
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
			oBinding.filter(resFilter);
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

			var sPath;
			var bDescending;
			var vGroup;
			var aSorters = [];
			// группировка
			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aSorters.push(new Sorter(sPath, bDescending, vGroup));
			}

			// сортировка
			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			if (sPath === "Pernr") {
				aSorters.push(new Sorter(sPath, bDescending, false, this.compareIntegers));
			} else {
				aSorters.push(new Sorter(sPath, bDescending));
			}
			oBinding.sort(aSorters);

			// // устанавливаем фильтры
			// var aFilters = [];
			// jQuery.each(mParams.filterItems, function(i, oItem) {
			// 	var aSplit = oItem.getKey().split("___");
			// 	var sPath = aSplit[0];
			// 	var sOperator = aSplit[1];
			// 	var sValue1 = aSplit[2];
			// 	var sValue2 = aSplit[3];
			// 	var oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
			// 	aFilters.push(oFilter);
			// });
			// oBinding.filter(aFilters);
		},

		compareIntegers: function(value1, value2) {
			if ((value1 === null || value1 === undefined || value1 === '') &&
				(value2 === null || value2 === undefined || value2 === '')) return 0;
			if ((value1 === null || value1 === undefined || value1 === '')) return -1;
			if ((value2 === null || value2 === undefined || value2 === '')) return 1;
			if (parseInt(value1) < parseInt(value2)) return -1;
			if (parseInt(value1) == parseInt(value2)) return 0;
			if (parseInt(value1) > parseInt(value2)) return 1;
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