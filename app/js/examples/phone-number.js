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