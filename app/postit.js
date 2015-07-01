/**
 * Created by nicolas.boe on 30/06/2015.
 */
angular.module('postit', ['ngStorage'])
    .controller('postitController', function ($scope, $sessionStorage) {
        $scope.postItLarge = false;
        $scope.nbByPage = 6;
        $scope.todos = [];
        if (angular.isDefined($sessionStorage.todos)) {
            $scope.todos = $sessionStorage.todos;
        }
        if (angular.isDefined($sessionStorage.postItLarge)) {
            $scope.postItLarge = $sessionStorage.postItLarge;
        }

        $scope.nbPage = 0;

        $scope.$watch('postItLarge', function (newVal, oldVal) {
            if (newVal) {
                $scope.nbByPage = 4;
            }
            else {
                $scope.nbByPage = 6;
            }
            $sessionStorage.postItLarge = newVal;
        });

        $scope.$watch('todos.length', function (newVal, oldVal) {
            $scope.nbPage = Math.ceil(newVal / 6);
        });

        $scope.addTodo = function () {

            if (angular.isDefined($scope.us)) {
                if ($scope.editing > -1) {
                    $scope.editing = -1;
                    var title = angular.copy($scope.us.title);
                    $scope.us = {title: title};
                } else {

                    $scope.todos.push(angular.copy($scope.us));
                }
                $sessionStorage.todos = $scope.todos;
                $scope.us.content = '';
                $scope.us.id = '';
                $scope.us.point = '';
            }
        };

        $scope.addFromCSV = function () {
            if (angular.isDefined($scope.csv)) {
                var csv = $scope.csv;
                var lignes = csv.split(/(\r\n|\n|\r)/gi);
                angular.forEach(lignes, function (ligne) {
                    var res = ligne.match(/(\r\n|\n|\r)/gi);
                    if (res != null) {
                        return;
                    }
                    var items = ligne.split(";");
                    var todo = {};
                    if (items.length > 1) {
                        todo.title = items[0];
                        todo.content = items[1];
                        if (angular.isDefined(items[2])) {
                            todo.point = items[2];
                        }
                        if (angular.isDefined(items[3])) {
                            todo.id = items[3];
                        }
                    }
                    else {
                        todo.content = items[0];
                    }
                    $scope.todos.push(todo);

                });
                $sessionStorage.todos = $scope.todos;
                $scope.csv = "";

            }
        };

        $scope.delete = function (key) {
            $scope.todos.splice(key, 1);
            $sessionStorage.todos = $scope.todos;
        };

        $scope.deleteAll = function () {
            $scope.todos = [];
            $sessionStorage.todos = $scope.todos;
        };

        $scope.editing = -1;
        $scope.edit = function (key) {
            $scope.editing = key;
            $scope.us = $scope.todos[key];
        };

        $scope.duplicate = function (key) {
            var dupli = angular.copy($scope.todos[key]);
            $scope.todos.splice(key, 0, dupli);
            $scope.us = $scope.todos[key + 1];

            $scope.editing = key + 1;
        };

        //$scope.duplicateUs = function () {
        //    $scope.todos.push(angular.copy($scope.us));
        //    $sessionStorage.todos = $scope.todos;
        //    $scope.edit($scope.todos.length);
        //};

        $scope.print = function () {
            window.print();
        }


    });

