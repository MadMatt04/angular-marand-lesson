(function _namespace(aml) {

    var helloApp = angular.module("amlHelloApp", []);

    console.log("Aml hello app", helloApp);
    
     helloApp.controller("AmlHelloWorldAppController", ["$scope", function($scope) {
         $scope.style = {
             "background-color": "#A80CA8"
         };
         
        $scope.$watch("color", function(newValue) {
            $scope.style["background-color"] = newValue;
        });
     }]);

}(window.aml = window.aml || {}));