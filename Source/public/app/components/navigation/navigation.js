angular.module('navigation', []).
directive('navLink', navLink);

function navLink($location)
{
    var activeCssClass = "md-accent";
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller)
        {
            var path = element.attr("ng-href");
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
