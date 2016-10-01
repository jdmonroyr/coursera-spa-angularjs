(function (){

'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope){

  $scope.checkIfTooMuch = function (){

    if(!$scope.lunchMenu){
      $scope.isError = true;
      return $scope.adviceMessage = "Please enter data first.";
    }
    if(isTooMuch(countMenuItems($scope.lunchMenu))){
      $scope.adviceMessage = "Too Much!";
    }
    else {
      $scope.adviceMessage = "Enjoy!";
    }
    $scope.isError = false;
  };

  function countMenuItems (stringMenu){

    var count = 0;

    if(stringMenu && stringMenu.length > 0){
      var items = stringMenu.split(',');
      for (var item in items) {
        if(items[item].trim().length > 0){
          count++;
        }
      }
    }
    // console.log("The count is: " + count);
    return count;
  };

  function isTooMuch (itemsQty){

    var TOO_MUCH_LIMIT = 3;

    if(itemsQty > TOO_MUCH_LIMIT)
      return true;

    return false;
  };

};

})();
