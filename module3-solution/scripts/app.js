(function () {

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {

  var ddo = {
    templateUrl : 'foundItems.html',
    scope : {
      items : '<',
      onRemove: '&'
    },
    controller : FoundItemsDirectiveController,
    controllerAs : 'fndItemsDirCtrl',
    bindToController : true
  };

  return ddo;

};

function FoundItemsDirectiveController () {
  var fndItemsDirCtrl = this;

  fndItemsDirCtrl.itemsFound = function () {

    if (fndItemsDirCtrl.items === undefined)
      return 0;

    return fndItemsDirCtrl.items.length;
  }

};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {

  var narrowCtrl = this;

  narrowCtrl.showNoDataMessage = false;

  narrowCtrl.findMenuItems = function (searchTerm) {

    if(!searchTerm){
      narrowCtrl.showNoDataMessage = true;
      narrowCtrl.found = [];
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (matchedMenuItems) {

      matchedMenuItems.length === 0 ? narrowCtrl.showNoDataMessage = true :
        narrowCtrl.showNoDataMessage = false

      narrowCtrl.found = matchedMenuItems;

    })
    .catch(function (error) {
      console.log("Something went terribly wrong." + error);
    });

  };

  narrowCtrl.removeItem = function (index) {
    MenuSearchService.removeItem(index);
  };

};

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService ($http, ApiBasePath) {

  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function (result) {

      var fullMenuItems = result.data.menu_items;
      foundItems.length = 0;

      for (i = 0; i < fullMenuItems.length; i++){
        if(fullMenuItems[i].description.indexOf(searchTerm) !== -1){
          foundItems.push(fullMenuItems[i]);
        }
      }
      return foundItems;
    });

  };

  service.removeItem = function (index) {
    foundItems.splice(index, 1);
  };

};

})();
