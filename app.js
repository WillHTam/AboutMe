angular.module('myApp', ['ngAnimate', 'ui.bootstrap']);
angular.module('myApp').controller('myCtrl', function ($scope, $uibModal, $log, $http, $sce) {

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

  $scope.htmlPopover1 = $sce.trustAsHtml('<img src="https://i.imgur.com/gElLlq5.png"> <p id="pop">Better Bookmarking Front-end. Front-end connects to API built with NodeJS</p>')

  $scope.htmlPopover2 = $sce.trustAsHtml('<img style="height=250" src="https://i.imgur.com/gWWHAGE.png?1"> <p id="pop">CoffeePass: Coffee subscription site built in only one day for a Startup Weekend. Meant to be viewed on Mobile </p>')

  $scope.htmlPopover3 = $sce.trustAsHtml('<img src="https://i.imgur.com/wf9FD9A.png?1"> <p id="pop">Project to consume Spotify API. Try the song search</p>')

  $scope.htmlPopover4 = $sce.trustAsHtml('<p id="pop">Draw collaboratively on a grid with socket.io</p>')

  $scope.htmlPopover5 = $sce.trustAsHtml('<img src=""> <p id="pop">Blog created in Ruby on Rails and PosgresQL. If Heroku was cooperative, would be able to upload images and send confirmation emails.</p>')

  $scope.animationsEnabled = true

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});



// var app =angular.module('myApp', [])
// app.controller('myCtrl', function($scope, $http) {
  // $http.get("https://myapi299.herokuapp.com/")
  // .then(function(response) {
  //   $scope.name = response.data[0].name
  //   $scope.dob = response.data[0].dob
  //   $scope.work = response.data[0].work
  //   $scope.description = response.data[0].description
  //   $scope.education = response.data[0].education
  //   $scope.projects = response.data[0].projects
  //   $scope.projectlinks = response.data[0].projectlinks
  //   $scope.email = response.data[0].email
  //   $scope.phone = response.data[0].phone
  //   $scope.skills = response.data[0].skills
  //   $scope.links = response.data[0].links
  //   $scope.linknames = response.data[0].linknames
  // })
// })
