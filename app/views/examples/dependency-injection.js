// The $location service is "auto-magically" injected into the AmlNavigatorService
amlApp.factory("AmlNavigatorService", ["$location", function($location) {
    return {
        // Some service object
    };
}]);


// Now the AmlNavigatorService is injected into the AmlMainController
amlApp.controller("AmlMainController", ["AmlNavigatorService", function(AmlNavigatorService) {
    $scope.navigation({
        next: "/whatis"
    });
}]);