(function() {
  'use strict';

  angular
    .module('exceptionHandler', [])
    .config(exceptionConfig);

  function exceptionConfig($provide) {
      $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  function extendExceptionHandler($delegate) {
      return function(exception, cause) {
          $delegate(exception, cause);
          //TODO:call logging later
          console.log('Not handled exception occured: '+ exception);
      };
  }
})();
