'use strict';

import NavbarCtrl from '../app/components/navbar/navbar.controller';
import CreatorCtrl from '../app/components/creator/creator.controller';
import PlayCtrl from '../app/components/play/play.controller';

angular.module('js', ['ui.router'])
  .controller('NavbarCtrl', NavbarCtrl)
  .controller('CreatorCtrl', CreatorCtrl)
  .controller('PlayCtrl', PlayCtrl)

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'app/main/main.html',
        controller: 'CreatorCtrl'
      })
      .state('main.create', {
        url: '/create',
        templateUrl: 'app/components/creator/creator.html',
        controller: 'CreatorCtrl'
      })
      .state('main.play', {
        url: '/play',
        templateUrl: 'app/components/play/play.html',
        controller: 'PlayCtrl',
        params: {answer: null}
      });

    $urlRouterProvider.otherwise('/create');
  })
;
