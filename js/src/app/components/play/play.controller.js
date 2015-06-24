/**
 * Created by Mike_Edwards on 6/24/15.
 */
'use strict';
const MAX_GUESSES = 5;
const sliced = (arr, start, deleteCount) => {
  return arr.slice(0, start).concat(arr.slice(start + deleteCount));
};

class PlayCtrl {
  constructor ($scope, $state, $stateParams, $window) {
    $scope.answer = $stateParams.answer || 'hangman';
    $scope.guess = '';
    $scope.guesses = [];
    $scope.misses = [];

    $scope.recordGuess = () => {
      if ($scope.guesses.indexOf($scope.guess) >= 0 || $scope.guess === '' || $scope.guess.length > 1) {
        return;
      }
      $scope.guesses.push($scope.guess);
      if ($scope.answer.split('').indexOf($scope.guess) < 0) {
        $scope.misses.push($scope.guess);
      }
      $scope.guess = '';

      $scope.hasFinished();
    };

    $scope.displayGuesses = () => {
      return $scope.guesses.join(', ');
    };

    $scope.calculateGuessesRemaining = () => {
      return MAX_GUESSES - $scope.misses.length;
    };

    $scope.hasWon = () => {
      if (!$scope.answer) {
        return false;
      }
      const test = {
        guesses: $scope.guesses.slice(),
        matches: $scope.answer.split('').filter((char, index, _this)=>{return _this.indexOf(char) === index;})
      };
      const result = test.matches
        .reduce((test, char) => {
          for (let guess in test.guesses) {
            if (test.guesses.hasOwnProperty(guess) && char === test.guesses[guess]) {
              return {
                guesses: sliced(test.guesses, test.guesses.indexOf(char),1),
                matches: sliced(test.matches, test.matches.indexOf(char),1)
              };
            }
          }
          return test;
        }, test);
      return result.matches.length === 0;
    };

    $scope.hasLost = () => {
      if (!$scope.answer) {
        return false;
      }
      return $scope.calculateGuessesRemaining() <= 0;
    };

    $scope.hasFinished = () => {
      if ($scope.hasWon()) {
        $window.alert('You won!');
        $state.go('^.create');
      }

      if ($scope.hasLost()) {
        $window.alert('You lost!');
        $state.go('^.create');
      }
    };

    $scope.reveal = () => {
      return $scope.answer
        .split('')
        .map((char) => {
          for (let guess in $scope.guesses) {
            if ($scope.guesses.hasOwnProperty(guess) && char === $scope.guesses[guess]) {
              return char;
            }
          }
          return '_';
        })
        .join('');
    };
  }
}

PlayCtrl.$inject = ['$scope', '$state', '$stateParams', '$window'];

export default PlayCtrl;
