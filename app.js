
var app =angular.module('myApp', [])
app.controller('myCtrl', function($scope, $http) {
  $http.get("https://myapi299.herokuapp.com/")
  .then(function(response) {
    $scope.name = response.data[0].name
    $scope.dob = response.data[0].dob
    $scope.work = response.data[0].work
    $scope.description = response.data[0].description
    $scope.education = response.data[0].education
    $scope.projects = response.data[0].projects
    $scope.projectlinks = response.data[0].projectlinks
    $scope.email = response.data[0].email
    $scope.phone = response.data[0].phone
    $scope.skills = response.data[0].skills
    $scope.links = response.data[0].links
    $scope.linknames = response.data[0].linknames
  })
})
