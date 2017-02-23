/**
 * Created by lluis on 22/02/2017.
 */

angular
  .module('app')
  .controller('ZineController', ['$scope', '$state', 'Zine', function($scope, $state, Zine) {

    $scope.zines = [];

    function getList() {
      Zine
        .find()
        .$promise
        .then(function(results) {
          $scope.zines = results;
        });
    }
    getList();

    $scope.add = function() {
      Zine
        .create($scope.newZine)
        .$promise
        .then(function(zine) {
          $scope.newZine = '';
          $scope.zineForm.title.$setPristine();
          $scope.zineForm.description.$setPristine();
          $scope.zineForm.categorie.$setPristine();
          $scope.zineForm.image.$setPristine();
          $('.focus').focus();
          getList();
        });
    };

    $scope.remove = function(item) {
      Zine
        .deleteById(item)
        .$promise
        .then(function() {
          getList();
        });
    };
  }]);

/**
 * Search filter by title and categorie.
 */
app.filter('searchFor', function(){
  return function(arr, searchString){
    if(!searchString){
      return arr;
    }
    var result = [];
    searchString = searchString.toLowerCase();
    angular.forEach(arr, function(item){
      if(item.title.toLowerCase().indexOf(searchString) !== -1){
        result.push(item);
      } else {
        if(item.categorie.toLowerCase().indexOf(searchString) !== -1){
          result.push(item);
        }
      }

    });
    return result;
  };
});

