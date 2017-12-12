sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./../model/formatter",
	"sap/m/GroupHeaderListItem",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/odata/CountMode",
	"sap/ui/model/FilterOperator"
], function(Controller, Formatter, GroupHeaderListItem, Sorter, Filter, CountMode, FilterOperator) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.OdataModelView", {
		formatter: Formatter,

		onInit: function() {
			var oMdl = new sap.ui.model.odata.v2.ODataModel("/Northwind/Northwind.svc/", {
				defaultCountMode: CountMode.Inline,
				useBatch: false
			});
			this.getView().setModel(oMdl);

			// https://services.odata.org/Northwind/Northwind.svc/Employees?$format=json&$expand=Orders&$select=EmployeeID,LastName,FirstName,Orders/OrderDate,Orders/ShipName&$orderby=EmployeeID%20desc&$skip=5&$top=2&$inlinecount=allpages
			oMdl.read("/Employees", {
				urlParameters: {
					"$expand": "Orders",
					"$select": "EmployeeID,LastName,FirstName,Orders/OrderDate,Orders/ShipName",
					"$orderby": "EmployeeID desc",
					"$inlinecount": "allpages",
					"$skip": "5",
					"$top": "2"
				},
				filters: [
					new sap.ui.model.Filter({
						path: "EmployeeID",
						operator: "GE",
						value1: "1"
					})
				],
				success: function(oEvt) {
					if (oEvt) {

					}
				},
				error: function(oEvt) {
					if (oEvt) {

					}
				}
			});
		},

		onTblSel: function() {
			this.changeTableBinding();
		},

		changeTableBinding: function() {
			var oTbl = this.getView().byId("table0");
			var oItem = oTbl.getSelectedItem();
			if (!oItem) {
				return;
			}
			var oBndCnt = oItem.getBindingContext();
			if (!oBndCnt) {
				return;
			}

			var oSelObj = oBndCnt.getObject();

			var oTblDtl = this.getView().byId("tableDtl");
			var oBindInfo = oTbl.getBindingInfo("items");

			if (oBindInfo) {
				oTblDtl.bindRows({
					path: "/Employees(" + oSelObj.EmployeeID + ")/Orders", // oBindInfo.path, 
					template: oBindInfo.template,
					parameters: {
						select: "OrderID, ShipPostalCode, ShipCountry, ShipCity, ShipAddress, ShipName, OrderDate, ShippedDate, Freight"
					}
				});
			}
		},

		getGroup: function(oContext) {
			return oContext.getProperty('City');
		},

		getGroupHeader: function(oGroup) {
			return new GroupHeaderListItem({
				title: oGroup.key,
				upperCase: false
			});
		},

		onSortTbl: function(oEvent) {
			var oCurrentColumn = oEvent.getParameter("column");
			// отключить стандартную обработку сортировки
			oEvent.preventDefault();

			var sOrder = oEvent.getParameter("sortOrder");
			oCurrentColumn.setSorted(true);
			oCurrentColumn.setSortOrder(sOrder);

			var oSorter = new Sorter(oCurrentColumn.getSortProperty(), sOrder === sap.ui.table.SortOrder.Descending);
			this.getView().byId("tableDtl").getBinding("rows").sort(oSorter);
		},

		onFilterTbl: function(oEvt) {
			var sVal = oEvt.getParameter("value");
			// отключить стандартную обработку фильтрации
			oEvt.preventDefault();
			
			var oCurrentColumn = oEvt.getParameter("column");
			
			oCurrentColumn.setFiltered(sVal ? true : false);
			if (oCurrentColumn.getId().indexOf("addrCol") >= 0 ) {
				var oFilter = new Filter({
					filters: [
						new Filter({
							path: "ShipPostalCode",
							operator: FilterOperator.Contains,  //EQ,
							value1: sVal
						}),
						new Filter({
							path: "ShipCountry",
							operator: FilterOperator.Contains,  //EQ,
							value1: sVal
						}),
						new Filter({
							path: "ShipCity",
							operator: FilterOperator.Contains,  //EQ,
							value1: sVal
						}),
						new Filter({
							path: "ShipAddress",
							operator: FilterOperator.Contains,  //EQ,
							value1: sVal
						})
					],
					and: false
				});
				
				var ordCol = this.getView().byId("orderIdCol");
				ordCol.setFiltered(false);
			} else {
				oFilter = new Filter({
					path: oCurrentColumn.getFilterProperty(),
					operator: FilterOperator.EQ, //Contains,  //EQ,
					value1: sVal
				});
				var addrCol = this.getView().byId("addrCol");
				addrCol.setFiltered(false);
			}
			this.getView().byId("tableDtl").getBinding("rows").filter(oFilter);
		}
	});

});