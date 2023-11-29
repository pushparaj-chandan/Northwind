sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.probosys.North.controller.View1", {
		onInit: function () {

			this.top = 0;
			var oModel = new sap.ui.model.json.JSONModel("https://services.odata.org/v2/northwind/northwind.svc/Orders?");
			this.getView().setModel(oModel, "oModel");
			console.log(this.getView().getModel("oModel").getData());
			/*var oList=this.getView().byId("idList");
			oList.attachBrowserEvent("click", function (oEvent) {
				console.log("hello");
				this.Headerdata = oEvent.currentTarget.innerText;

			}, this);*/
			/*			window.scroll = () => {
			    // place the scroll handling logic here
			    alert("hello");
			};*/
			var that = this;
			this.onHitSRV();
			// window.addEventListener('scroll', function () {
			// 	var scrollPosition = window.scrollY;
			// 	// Get the height of the viewport
			// 	var viewportHeight = window.innerHeight;

			// 	// Get the height of the document
			// 	var documentHeight = document.documentElement.scrollHeight;

			// 	// Calculate the distance from the bottom of the page
			// 	var distanceFromBottom = documentHeight - (scrollPosition + viewportHeight);

			// 	// Check if the user has scrolled to the bottom of the page
			// 	if (distanceFromBottom < 50) {
			// 		// Call your function here
			// 		that.myFunction();
			// 	}
			// 	//	that.onHitSRV();
			// });

		},

		grow: function () {
			var oServiceModel = this.getView().getModel();
			var relPath = "Orders?$skip=50$top=20&$format=json"
			oServiceModel.read(relPath, null, [], false, {
				function (oData, response) {
					debugger;
					var dropData = oData.results;
					oModel.setData({
						"VendorAccountsSet": dropData
					});
					that.getView().setModel(oModel, "oModelVendor");
				},
				function (oError) {
					var msg = JSON
						.parse(oError.response.body).error.message.value;
					sap.m.MessageToast.show(msg, {
						duration: 10000
					});
				}
			});
			console.log("Hello");
		},
		onHitSRV: function () {
			var that = this;
			this.top = top + 50;
			var oModel = this.getView().getModel();
			var DashboardPlantModel = new sap.ui.model.json.JSONModel();
			oModel.read("/Orders", {
				context: true,
				async: false,
				urlParameters: {
					"$top": 100
				},
				success: function (oData) {
					DashboardPlantModel.setData(oData);
					that.getView().setModel(DashboardPlantModel, "DashboardPlantModel");
				},
				error: function (oError) {
					var msg = oError.message;
					sap.m.MessageToast.show(msg, {
						duration: 10000
					});
				}
			});

		},
		//Apply new changes
		onApplyNew: function () {
			alert("Dev Testing done for Debug 1234");
		}

	});
});
