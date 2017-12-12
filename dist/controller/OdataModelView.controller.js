sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./../model/formatter",
	"sap/m/GroupHeaderListItem",
	"sap/ui/model/Sorter"
], function(Controller, Formatter, GroupHeaderListItem, Sorter) {
	"use strict";

	return Controller.extend("alfa.DataBindingExample.controller.OdataModelView", {
		formatter: Formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf alfa.DataBindingExample.view.OdataModelView
		 */
		onInit: function() {
			var oMdl = new sap.ui.model.odata.v2.ODataModel("/Northwind/Northwind.svc/");
			this.getView().setModel(oMdl);
		},
		
		onTblSel : function(){
			this.changeTableBinding();
		},
		
		changeTableBinding : function(){
			var oTbl = this.getView().byId("table0");
			var oItem = oTbl.getSelectedItem();
			var oBndCnt = oItem.getBindingContext();
			if (!oBndCnt){
				return;
			}
			
			var oSelObj = oBndCnt.getObject();

			var oTblDtl = this.getView().byId("tableDtl");
			var oBindInfo = oTbl.getBindingInfo("items");
			
			if (oBindInfo) {
				oTblDtl.bindRows({
					path 	 : "/Employees(" + oSelObj.EmployeeID + ")/Orders", // oBindInfo.path, 
					template : oBindInfo.template
					// filters  : new sap.ui.model.Filter("orgeh", sap.ui.model.FilterOperator.EQ, sOrgeh)
				});
			}
		},
		
		getGroup : function(oContext){
			return oContext.getProperty('City');
		},
		
		getGroupHeader : function(oGroup){
			return new GroupHeaderListItem({
				title : oGroup.key,
				upperCase : false
			});
		},
		
		onSortTbl : function(oEvent){
			var oCurrentColumn = oEvent.getParameter("column");
			// var oDeliveryDateColumn = this.getView().byId("deliverydate");
			oEvent.preventDefault();

			var sOrder = oEvent.getParameter("sortOrder");
			// var oDateFormat = DateFormat.getDateInstance({pattern: "dd/MM/yyyy"});

			// this._resetSortingState(); //No multi-column sorting
			oCurrentColumn.setSorted(true);
			oCurrentColumn.setSortOrder(sOrder);

			var oSorter = new Sorter(oCurrentColumn.getSortProperty(), sOrder === sap.ui.table.SortOrder.Descending);
			oSorter.fnCompare = function(a, b) {
				if (b == null) {
					return -1;
				}
				if (a == null) {
					return 1;
				}

				// var aa = oDateFormat.parse(a).getTime();
				// var bb = oDateFormat.parse(b).getTime();

				if (aa < bb) {
					return -1;
				}
				if (aa > bb) {
					return 1;
				}
				return 0;
			};

			this.getView().byId("tableDtl").getBinding("rows").sort(oSorter);
		},
		
		onFilterTbl : function(oEvt){
			oEvt.preventDefault();
		}
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf alfa.DataBindingExample.view.OdataModelView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf alfa.DataBindingExample.view.OdataModelView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf alfa.DataBindingExample.view.OdataModelView
		 */
		//	onExit: function() {
		//
		//	}

	});

});