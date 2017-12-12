jQuery.sap.declare("alfa.DataBindingExample.model.formatter");
alfa.DataBindingExample.model.formatter = {
	formatIcon: function(sVal) {
		switch (sVal) {
			case "07":
				this.addStyleClass("redIcon");
				var rVal = "sap-icon://official-service";
				break;
			case "18":
				this.addStyleClass("redIcon");
				rVal = "sap-icon://study-leave";
				break;
			case "19":
				this.addStyleClass("blueIcon");
				rVal = "sap-icon://education";
				break;
			default:
		}

		return rVal;
	},

	formatToInt: function(sVal) {
		var iVal;
		if (sVal) {
			iVal = parseInt(sVal);
		} else {
			iVal = 0;
		}
		return iVal;
	},

	formatImg: function(sVal) {
		var sTrimmedData = sVal.substr(104);
		sTrimmedData = "data:image/png;base64," + sTrimmedData;
		return sTrimmedData;
	}
};

// sap.ui.define([], function() {
// 	"use strict";

// 	return {
// 		formatIcon: function(sVal) {
// 			switch (sVal) {
// 				case "07":
// 					if (this.addStyleClass) {
// 						this.addStyleClass("redIcon");
// 					}
// 					var rVal = "sap-icon://official-service";
// 					break;
// 				case "18":
// 					if (this.addStyleClass) {
// 						this.addStyleClass("redIcon");
// 					}
// 					rVal = "sap-icon://study-leave";
// 					break;
// 				case "19":
// 					if (this.addStyleClass) {
// 						this.addStyleClass("blueIcon");
// 					}
// 					rVal = "sap-icon://education";
// 					break;
// 				default:
// 			}

// 			return rVal;
// 		},

// 		formatToInt: function(sVal) {
// 			var iVal;
// 			if (sVal) {
// 				iVal = parseInt(sVal);
// 			} else {
// 				iVal = 0;
// 			}
// 			return iVal;
// 		},

// 		formatImg: function(sVal) {
// 			var sTrimmedData = sVal.substr(104);
// 			// oImg.setSrc("data:image/bmp;base64," + sTrimmedData);
// 			sTrimmedData = "data:image/png;base64," + sTrimmedData;
// 			// sVal = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
// 			// 	"AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO" +
// 			// 	"9TXL0Y4OHwAAAABJRU5ErkJggg==";
// 			return sTrimmedData;
// 		}

// 	};
// });