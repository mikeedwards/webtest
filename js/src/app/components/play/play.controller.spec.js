/**
 * Created by Mike_Edwards on 6/24/15.
 */
/**
 * Created by Mike_Edwards on 6/23/15.
 */
'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('js'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('reveals letters on correct guesses', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    scope.answer = 'finish';
    scope.guesses = ['h', 'i'];

    expect(scope.reveal()).toBe('_i_i_h');
  }));

  it('does not reveal letters on incorrect guesses', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    scope.answer = 'finish';
    scope.guesses = ['q', 'z'];

    expect(scope.reveal()).toBe('______');
  }));

  it('records a correct guess', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    scope.answer = 'finish';
    scope.guess = 'i';
    scope.recordGuess();

    expect(scope.guesses[0]).toBe('i');
    expect(scope.misses.length).toBe(0);
  }));

  it('clears the last guess', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    scope.guess = 'i';
    scope.recordGuess();

    expect(scope.guess).toBe('');
  }));

  it('disallows blank guesses', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    expect(scope.guesses.length).toBe(0);
    expect(scope.misses.length).toBe(0);

    scope.guess = '';
    scope.recordGuess();

    expect(scope.guesses.length).toBe(0);
    expect(scope.misses.length).toBe(0);
  }));

  it('disallows multicharacter guesses', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    expect(scope.guesses.length).toBe(0);
    expect(scope.misses.length).toBe(0);

    scope.guess = 'it';
    scope.recordGuess();

    expect(scope.guesses.length).toBe(0);
    expect(scope.misses.length).toBe(0);
  }));

  it('displays the guesses', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    scope.guesses = ['i', 'q'];

    expect(scope.displayGuesses()).toBe('i, q');
  }));

  it('records an incorrect guess', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    scope.answer = 'finish';
    scope.guess = 'z';
    scope.recordGuess();

    expect(scope.guesses[0]).toBe('z');
    expect(scope.misses[0]).toBe('z');
  }));

  it('counts the remaining guesses', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    expect(scope.calculateGuessesRemaining()).toBe(5);

    scope.misses = 'z';

    expect(scope.calculateGuessesRemaining()).toBe(4);
  }));

  it('detects winning guesses', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    expect(scope.hasWon()).toBeFalsy();

    scope.answer = 'finish';

    expect(scope.hasWon()).toBeFalsy();

    scope.guesses = ['f','i','n','s'];

    expect(scope.hasWon()).toBeFalsy();

    scope.guesses = ['f','i','n','s','h'];

    expect(scope.hasWon()).toBeTruthy();

    scope.guesses = ['q','z','f','i','n','s','h'];

    expect(scope.hasWon()).toBeTruthy();
  }));

  it('detects losses', inject(function($controller) {
    $controller('PlayCtrl', {
      $scope: scope
    });

    expect(scope.hasLost()).toBeFalsy();

    scope.answer = 'baz'

    scope.misses = ['f'];

    expect(scope.hasLost()).toBeFalsy();

    scope.misses = ['f','i','n','s','h'];

    expect(scope.hasLost()).toBeTruthy();
  }));
});
