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
                .when('/whatis', {
                    templateUrl: 'views/whatis.html',
                    controller: 'AmlWhatIsController',
                    controllerAs: 'amlWhatIsCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);

    amlApp.factory("AmlNavigator", ["$location", function($location) {
        return {
            actions: [],
            current: null,
            handledNavigations: [],

            add: function(action, current) {
                this.actions.push(action);
                if (current) {
                    this.current = this.actions.length - 1;
                }
            },

            addNavigationAction: function(path, current) {
                if (!this.handledNavigations[path]) {
                    this.add(function() {
                        console.log("Navigation to", path);
                        $location.path(path);
                    }, current);
                    this.handledNavigations[path] = true;
                }

            },

            forward: function() {
                var index = this.current + 1;
                if (index < this.actions.length) {
                    var action = this.actions[index];
                    this.current = index;
                    action.call();
                }

                return this.current;
            },

            back: function() {
                var index = this.current - 1;
                if (index >= 0) {
                    var action = this.actions[index];
                    this.current = index;
                    action.call();
                }

                return this.current;
            }
        };
    }]);

    amlApp.directive('keypressEvents', ["$document", "$rootScope",
            function($document, $rootScope) {
                return {
                    restrict: 'A',
                    link: function() {
                        console.log('linked');
                        $document.bind('keyup', function(e) {
                            $rootScope.$broadcast('keyup', e, e.which);
                        });
                    }
                }
            }
        ]
    );

    amlApp.controller("AmlParentController", ["$rootScope", "$location", "AmlNavigator", function($rootScope, $location, AmlNavigator) {
        console.log("parentController");
        $rootScope.$on("keyup", function($event, domEvent, key) {
            console.log("keypress", $event, domEvent, key);
            if (key === 39) {
                console.log("39");
                $rootScope.$apply(function() {
                    AmlNavigator.forward();
                });
            } else if (key === 37) {
                $rootScope.$apply(function() {
                    AmlNavigator.back();
                });
            }
        })
    }]);

    amlApp.controller("AmlMainController", ["AmlNavigator", function(AmlNavigator) {
        console.log("Here we are");
        AmlNavigator.addNavigationAction("/", true);
        AmlNavigator.addNavigationAction("/whatis");
        console.log("AmlNavigator", AmlNavigator, AmlNavigator.actions);
    }]);
    
    amlApp.controller("AmlWhatIsController", ["AmlNavigator", function(AmlNavigator) {
        console.log("WhatIs");
       
    }]);
}(window.aml = window.aml || {}));