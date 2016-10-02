(function (){

'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {

  var toBuyCtrl = this;

  toBuyCtrl.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  toBuyCtrl.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.addBoughtItem(ShoppingListCheckOffService.getToBuyItem(itemIndex));
    ShoppingListCheckOffService.removeToBuyItem(itemIndex);
  }

};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {

  var boughtCtrl = this;

  boughtCtrl.boughtItems = ShoppingListCheckOffService.getBoughtItems();

  boughtCtrl.undoBought = function (itemIndex) {
    ShoppingListCheckOffService.addToBuyItem(ShoppingListCheckOffService.getBoughtItem(itemIndex));
    ShoppingListCheckOffService.removeBoughtItem(itemIndex);
  };

};

function ShoppingListCheckOffService () {

  var service = this;

  // ToBuy Items Array
  var toBuyItems = [
    { name : "cookies", quantity : 10 },
    { name : "chips", quantity : 5 },
    { name : "sodas", quantity : 8 },
    { name : "pies", quantity : 3 },
    { name : "pizzas", quantity : 2 },
  ];

  // Bought Items Array
  var boughtItems = [];

  // ToBuyItems Operations

  service.addToBuyItem = function (toBuyItem) {
    toBuyItems.push(toBuyItem);
  };

  service.getToBuyItem = function (itemIndex) {
    return toBuyItems[itemIndex];
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.removeToBuyItem = function (itemIndex) {
    toBuyItems.splice(itemIndex, 1);
  };

  // Bought Items Operations

  service.addBoughtItem = function (boughtItem) {
    boughtItems.push(boughtItem);
  };

  service.getBoughtItem = function (itemIndex) {
    return boughtItems[itemIndex];
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.removeBoughtItem = function (itemIndex) {
    boughtItems.splice(itemIndex, 1);
  };

};

})();
