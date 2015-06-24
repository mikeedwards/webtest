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

  it('converts an answer to underscores', inject(function($controller) {
    $controller('CreatorCtrl', {
      $scope: scope
    });

    expect(scope.encode()).toBe('');

    scope.answer = 'finish';

    expect(scope.encode()).toBe('______');
  }));

  it('receives a new answer word from the input', inject(function($controller) {
    expect(scope.answer).toBeUndefined();

    $controller('CreatorCtrl', {
      $scope: scope
    });

    expect(scope.answer).toBeFalsy();
  }));
});
