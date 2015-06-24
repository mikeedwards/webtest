/**
 * Created by Mike_Edwards on 6/23/15.
 */
'use strict';

class CreatorCtrl {
  constructor ($scope, $state) {
    $scope.answer = '';
    $scope.guess = '';
    $scope.guesses = [];
    $scope.misses = [];

    $scope.encode = () => {
      return $scope.answer
        .split('')
        .map(() => {
          return '_';
        })
        .join('');
    };

    $scope.recordAnswer = () => {
      $state.go('^.play', {answer: $scope.answer});
    };
  }
}

CreatorCtrl.$inject = ['$scope', '$state'];

export default CreatorCtrl;
