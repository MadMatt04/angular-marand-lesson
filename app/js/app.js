(function _namespace(aml) {

    var amlApp = angular.module("amlApp", ["ngRoute", "ngResource", "hljs"]);
    aml.app = amlApp;

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
                    controller: 'AmlWhatIsController'
                })
                .when('/tra', {
                    templateUrl: 'views/img.html',
                    controller: 'AmlTraController'
                })
                .when('/spa', {
                    templateUrl: 'views/img.html',
                    controller: 'AmlSpaController'
                })
                .when('/hello', {
                    templateUrl: 'views/iframe.html',
                    controller: 'AmlHelloController'
                })
                .when('/jquery', {
                    templateUrl: 'views/code.html',
                    controller: 'AmlJqueryBindingController'
                })
                .when('/angular-bind', {
                    templateUrl: 'views/code.html',
                    controller: 'AmlAngularBindingController'
                })
                .when('/hello-template', {
                    templateUrl: 'views/code.html',
                    controller: 'AmlHelloTemplateController'
                })
                .when('/hello-js', {
                    templateUrl: 'views/code.html',
                    controller: 'AmlHelloJsController'
                })
                .when('/features', {
                    templateUrl: 'views/features.html',
                    controller: 'AmlFeaturesController'
                })
                .when('/filters', {
                    templateUrl: 'views/filters.html',
                    controller: 'AmlFilterController'
                })
                .when('/directives', {
                    templateUrl: 'views/directives.html',
                    controller: 'AmlDirectivesController'
                })
                .when('/services', {
                    templateUrl: 'views/services.html',
                    controller: 'AmlServicesController'
                })
                .when('/angular2-1', {
                    templateUrl: 'views/angular2-1.html',
                    controller: 'AmlAngular2OneController'
                })
                .when('/angular2-2', {
                    templateUrl: 'views/angular2-2.html',
                    controller: 'AmlAngular2TwoController'
                })
                .when('/angular2-3', {
                    templateUrl: 'views/angular2-3.html',
                    controller: 'AmlAngular2ThreeController'
                })
                .when('/questions', {
                    templateUrl: 'views/questions.html',
                    controller: 'AmlQuestionsController'
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

            forward: function(slide) {
                var n = this._navObject;
                if (slide === true && n && n.next) {
                    $location.path(n.next);
                    return;
                }

                var nextIndex = n.current + 1;
                if (nextIndex >= 0 && nextIndex < n.showing.length) {
                    n.showing[nextIndex] = true;
                    n.current = nextIndex;
                }
                else if (nextIndex >= n.showing.length && n.next) {
                    $location.path(n.next);
                }
            },

            back: function(slide) {
                var n = this._navObject;
                if (slide === true && n && n.previous) {
                    $location.path(n.previous);
                    return;
                }

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
                    $document.bind('keyup', function(e) {
                        $rootScope.$broadcast('keyup', e, e.which);
                    });
                }
            }
        }
    ]);

    amlApp.directive('phoneNumber', [function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/phone-number.html',
            transclude: true,

            scope: {
                labelColor: '@'
            },
            link: function(scope, element) {
                var labelElement = element.find("label");
                labelElement.css({"color": scope.labelColor});
            }

        };
    }]);

    amlApp.controller("AmlParentController", ["$scope", "$rootScope", "AmlNavigator", function($scope, $rootScope, AmlNavigator) {

        $rootScope.$on("keyup", function($event, domEvent, key) {
            console.log("keypress", $event, domEvent, key);
            if (key === 39) { // right arrow
                $rootScope.$apply(function() {
                    AmlNavigator.forward();
                });

            }
            else if (key === 37) { // left arrow
                $rootScope.$apply(function() {
                    AmlNavigator.back();
                });
            }
            else if (key === 70) { // f
                $rootScope.$apply(function() {
                    AmlNavigator.forward(true);
                });
            }
            else if (key === 68) { // d
                $rootScope.$apply(function() {
                    AmlNavigator.back(true);
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
            next: "/jquery",
            points: 1
        });
        
        $scope.slideTitle = "Hello World";
        //$scope.iframeSrc = "https://preview.c9.io/madmatt04/angular-marand-lesson/app/hello.html";
        $scope.iframeSrc = "http://localhost:8082/hello.html";

    }]);

    amlApp.controller("AmlCodeController", ["$scope", function($scope) {
        $scope.$on("amlCodeLoaded", function($event, data) {
            $scope.codeText = data;
        });
    }]);

    amlApp.controller("AmlJqueryBindingController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/hello",
            next: "/angular-bind"
        });

        $scope.slideTitle = "JQuery Implementation";
        $scope.codeUrl = "/js/examples/jquery-ex.js";
    }]);

    amlApp.controller("AmlAngularBindingController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/jquery",
            next: "/hello-template"
        });

        $scope.slideTitle = "The Angular Way (Declarative Bindings)";
        $scope.codeUrl = "/views/examples/angular-binding.html";
    }]);

    amlApp.controller("AmlHelloTemplateController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/angular-bind",
            next: "/hello-js"
        });

        $scope.slideTitle = "Hello World - Angular Template";
        $scope.codeUrl = "/hello.html";
    }]);

    amlApp.controller("AmlHelloJsController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/hello-template",
            next: "/features"
        });

        $scope.slideTitle = "Hello World - The Javascript";
        $scope.codeUrl = "/js/hello.js";
    }]);

    amlApp.controller("AmlFeaturesController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/hello-js",
            next: "filters",
            points: 3
        });
    }]);

    amlApp.controller("AmlFilterController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/features",
            next: "/directives",
            points: 5
        });
    }]);

    amlApp.controller("AmlDirectivesController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/filters",
            next: "/services",
            points: 5
        });
    }]);

    amlApp.controller("AmlServicesController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/directives",
            next: "/angular2-1",
            points: 6
        });
    }]);

    amlApp.controller("AmlAngular2OneController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/services",
            next: "/angular2-2",
            points: 6
        });
    }]);

    amlApp.controller("AmlAngular2TwoController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/angular2-1",
            next: "/angular2-3",
            points: 5
        });
    }]);

    amlApp.controller("AmlAngular2ThreeController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/angular2-2",
            next: "/questions",
            points: 4
        });
    }]);

    amlApp.controller("AmlQuestionsController", ["$scope", function($scope) {
        $scope.navigation({
            previous: "/angular2-3"
        });
    }]);

}(window.aml = window.aml || {}));