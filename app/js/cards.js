(function _namespace(aml) {

    var cardsApp = angular.module("cardsApp", ["ngAnimate"]);
    aml.cardsApp = cardsApp;

    cardsApp.controller("AmlCardsController", ["$scope", "$timeout", function($scope, $timeout) {
        $scope.shuffled = false;
        $scope.shuffleText = "Deal";

        $scope.cards = [
            {
                "card": "6",
                "color": "spades"
            },
            {
                "card": "ace",
                "color": "clubs"
            },
            {
                "card": "jack",
                "color": "diamonds"
            },
            {
                "card": "queen",
                "color": "hearts"
            },
            {
                "card": "joker",
                "color": "red"
            }
        ];

        $scope.dealtCards = [];

        $scope.shuffle = function() {
            var shuffled = !$scope.shuffled;

            $scope.shuffleText = shuffled ? "Collect" : "Shuffle";
            $scope.lastCardInfo = {
                index: null,

            };

            if (shuffled) {
                angular.forEach($scope.cards, function(card, index) {
                    $timeout(function() {
                        $scope.dealtCards.push(card);
                    }, index * 1000)
                });

            } else {
                var cards = $scope.dealtCards.splice(0, $scope.dealtCards.length);
                angular.forEach(cards, function(card) {
                    $scope.cards.push(card);
                })
            }

            $scope.shuffled = shuffled;
        };
    }]);

    cardsApp.directive("amlCard", [function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/aml-card.html',

            scope: {
                card: '=',
                color: '=',
                flipped: '@'
            },
            link: function(scope, element) {

                function _flippedCard() {
                    //scope.cardSrc = "img/cards/back_of_orange.png";
                    //scope.shownColor = "orange";
                    //scope.shownCard = "unknown";
                }

                function _faceUpCard() {
                    //scope.cardSrc =  "img/cards/" + scope.card + "_of_" + scope.color + ".png";
                    //scope.shownColor = scope.color;
                    //scope.shownCard = scope.card;
                }

                scope.cardSrc =  "img/cards/" + scope.card + "_of_" + scope.color + ".png";


                scope.flipped = scope.flipped === "true";

                if (scope.flipped) {
                    _flippedCard();

                } else {
                    _faceUpCard();
                }

                scope.flip = function() {
                    var flipped = !scope.flipped;
                    if (flipped) {
                        _flippedCard()
                    } else {
                        _faceUpCard();
                    }

                    scope.flipped = flipped;
                    scope.onOff = !scope.onOff;
                };

                scope.onOff = false;
            }

        };
    }]);



}(window.aml = window.aml || {}));