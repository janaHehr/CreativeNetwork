angular.module('navigation', []).
directive('navLink', navLink);

navLink.$inject = ["$location"];

function navLink($location)
{
    var activeCssClass = "bgPurple";
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller)
        {
            var path = attrs.href;
            scope.location = $location;
            scope.$watch('location.path()', function(newPath)
            {
                if (path === newPath)
                    element.addClass(activeCssClass);
                else
                    element.removeClass(activeCssClass);
            });
        }
    };
}
