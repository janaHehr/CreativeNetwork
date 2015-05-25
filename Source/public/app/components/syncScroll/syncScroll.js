angular.module('comparex.syncScroll', [])
.directive('syncScroll', function() {
    var containerId;
    var markdownId;

    var syncScroll = function(){
      var codeViewport = document.querySelector('.CodeMirror-scroll'),
      previewViewport = document.getElementById(containerId),
      codeContent = document.querySelector('.CodeMirror-sizer'),
      previewContent = document.getElementById(markdownId),

      codeHeight = codeContent.clientHeight - window.getComputedStyle(codeViewport, null).height.split("px")[0],
      previewHeight = previewContent.clientHeight - window.getComputedStyle(previewViewport, null).height.split("px")[0],
      ratio = previewHeight / codeHeight,
      previewPostition = codeViewport.scrollTop * ratio;

      previewViewport.scrollTop = previewPostition;
    };

    return {
      restrict: 'A',
      scope: {
        previewContainer: '=',
        markdownContainer: '='
      },
      link: function(scope, element) {
        containerId = scope.previewContainer;
        markdownId = scope.markdownContainer;

        var codemirrorScroll = document.getElementsByClassName('CodeMirror-scroll')[0];
       codemirrorScroll.onscroll = syncScroll;
      }
    };
  });
