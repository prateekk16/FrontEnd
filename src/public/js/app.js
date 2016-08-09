$(function() {
    this.openNav = function() {
        document.getElementById("burger-nav").style.height = "100%";
    };

    this.closeNav = function() {
        document.getElementById("burger-nav").style.height = "0%";
    };
});

(function() {
    var app = angular.module('project', []);

    app.controller('NavigationController', function() {
        var vm = this;
        vm.active = "home";

        this.setActive = function(link) {
            vm.active = link;
        };

        this.checkActive = function(link) {
            return vm.active === link;
        };
    });

    app.controller('DataController', ['$http', function($http) {
        var list = this;
        this.progs = [];

        $http.get('../public/file/file.json').success(function(res) {
            list.progs = res.atoz_programmes.elements;
        });

    }]);


    app.controller('FamilyController', function() {
        this.names = storedNames;
        this.searchString = "";
    });

    app.filter("capitalize", function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        };
    });

    app.filter('searchFor', function() {

        return function(arr, searchString) {

            if (!searchString) {
                return arr;
            }

            var result = [];
            searchString = searchString.toLowerCase();

            angular.forEach(arr, function(object) {
                if (object.firstName.toLowerCase().indexOf(searchString) !== -1) {
                    result.push(object);
                }
            });

            return result;
        };
    });

    app.filter('maxAge', function() {
        return function(arr, query) {
            if (!query) {
                return arr;
            }
            var result = [];
            angular.forEach(arr, function(object) {
                if (object.age <= query) {
                    result.push(object);
                }
            });
            return result;
        };
    });




    var storedNames = [{
        firstName: 'Prateek',
        lastName: 'Singh',
        age: 28
    }, {
        firstName: 'Mayank',
        lastName: 'Singh',
        age: 30
    }, {
        firstName: 'Sunakshi',
        lastName: 'Singh',
        age: 32
    }, {
        firstName: 'Rashmi',
        lastName: 'Singh',
        age: 56
    }, {
        firstName: 'Krishna',
        lastName: 'Singh',
        age: 61
    }];

})();