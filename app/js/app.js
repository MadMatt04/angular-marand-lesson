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
                .when('/tra', {
                    templateUrl: 'views/img.html',
                    controller: 'AmlTraController',
                    controllerAs: 'amlTraCtrl'
                })
                .when('/spa', {
                    templateUrl: 'views/img.html',
                    controller: 'AmlSpaController',
                    controllerAs: 'amlSpaCtrl'
                })
                .when('/hello', {
                    templateUrl: 'views/iframe.html',
                    controller: 'AmlHelloController',
                    controllerAs: 'amlHelloCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);

    amlApp.factory("AmlNavigator", ["$location", function($location) {
        return {
            _navObject: null,
            navigation: function(navObject) {
                if (angular.isDefined(navObject)) {

                    var no = {
                        next: navObject.next,
                        previous: navObject.previous,
                        showing: [],
                        current: -1
                    };

                    var count = navObject.points;
                    if (angular.isDefined(count) && count > 0) {
                        for (var i = 0; i < count; i++) {
                            no.showing.push(false);
                        }
                    }

                    this._navObject = no;
                }


                return this._navObject;
            },

            forward: function() {
                var n = this._navObject;
                var nextIndex = n.current + 1;
                if (nextIndex >= 0 && nextIndex < n.showing.length) {
                    n.showing[nextIndex] = true;
                    n.current = nextIndex;
                }
                else if (nextIndex >= n.showing.length && n.next) {
                    $location.path(n.next);
                }
            },

            back: function() {
                var n = this._navObject;
                var prevIndex = n.current - 1;
                if (prevIndex >= -1 && prevIndex < n.showing.length) {
                    n.showing[n.current] = false;
                    n.current = prevIndex;
                }
                else if (prevIndex < -1 && n.previous) {
                    $location.path(n.previous);
                }
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
    ]);

    amlApp.controller("AmlParentController", ["$scope", "$rootScope", "AmlNavigator", function($scope, $rootScope, AmlNavigator) {
        console.log("parentController");
        $rootScope.$on("keyup", function($event, domEvent, key) {
            console.log("keypress", $event, domEvent, key);
            if (key === 39) {
                console.log("39");
                $rootScope.$apply(function() {
                    AmlNavigator.forward();
                });

            }
            else if (key === 37) {
                $rootScope.$apply(function() {
                    AmlNavigator.back();
                });
            }
        });

        $scope.navigation = function(navObject) {
            return AmlNavigator.navigation(navObject);
        };

        $scope.showNav = function(index) {
            var nav = AmlNavigator.navigation();
            if (index < nav.showing.length) {
                return nav.showing[index];
            }

            return false;
        }
    }]);

    amlApp.controller("AmlMainController", ["$scope", function($scope) {
        $scope.navigation({
            next: "/whatis"
        });


    }]);

    amlApp.controller("AmlWhatIsController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/",
            next: "/tra",
            points: 4
        });

    }]);

    amlApp.controller("AmlTraController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/whatis",
            next: "/spa"
        });

        $scope.img = "img/traditional-app.jpg";
        $scope.imgAlt = "Traditional App Image";
        $scope.slideTitle = "Traditional Web Application";
        $scope.imgCredit = "MSDN";

    }]);

    amlApp.controller("AmlSpaController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/tra",
            next: "/hello"
        });

        $scope.img = "img/sp-app.jpg";
        $scope.imgAlt = "Single-page Application";
        $scope.slideTitle = "Single-page Application Image";
        $scope.imgCredit = "MSDN";

    }]);

    amlApp.controller("AmlHelloController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/spa",
            points: 1
        });
        
        $scope.slideTitle = "Hello World";
        $scope.iframeSrc = "https://preview.c9.io/madmatt04/angular-marand-lesson/app/hello.html";

    }]);
}(window.aml = window.aml || {}));