(function _namespace(aml) {

    var amlApp = angular.module("amlApp", ["ngRoute"]);
    aml.app = amlApp;
    
    console.log("Loading");

    amlApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'AmlMainController',
                    controllerAs: 'amlMainCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);
    
    amlApp.controller("AmlParentController", [function () {
        console.log("parentController");
    }]);
    
    amlApp.controller("AmlMainController", [function() {
        console.log("Here we are");
        
        this.kp = function($event) {
            console.log("key pressed", $event);
        };
    }]);
}(window.aml = window.aml || {}));