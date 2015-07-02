(function _namespace(aml) {

    var amlApp = angular.module("amlApp", ["ngRoute"]);
    aml.app = amlApp;
    
    console.log("Loading");

    amlApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'AmlMainController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);
    
    amlApp.controller("AmlMainController", [function() {
        console.log("Here we are");
    }]);
}(window.aml = window.aml || {}));