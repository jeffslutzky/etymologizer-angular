myApp.controller('homeController', ['$scope', '$http', '$resource', 'etymologyService', 'originLanguageService', function($scope, $http, $resource, etymologyService, originLanguageService) {

  $scope.inputText = "";

  $scope.resourceURL = "https://etymologizer-api.herokuapp.com/api/word";

  $scope.getEtymologies = function() {

    $scope.etymologies = [];
    $scope.words = $scope.sanitize($scope.inputText); // array
    $scope.wordParams = $scope.words.join(" "); // string

    $scope.loading = true;

    $http.get($scope.resourceURL, {
      params: { words: $scope.wordParams }
    })
      .then(function success(response) {

        // cycle through each word
        $.each(response.data, function() {
          word = $scope.words.shift();
          this.entry_list.entry ? etymology = etymologyService.findEtymology(this) : etymology = null;
          etymology ? etymology = etymologyService.getValidHTML(etymology) : etymology = "null";
          etymology ? language = originLanguageService.getLanguage(etymology) : language = null;
          if (etymology === "null") {
            etymology = "<em>no etymology provided</em>";
          };
          $scope.etymologies.push({"word": word, "etymology": etymology, "language": language });
        });

      }, function error(response) {
        console.log("Error");
      })
      .finally(function() {
        $scope.loading = false;
      });
    };

  $scope.sanitize = function(wordString) {
    wordString = wordString.replace("-", " ");
    wordString = wordString.replace(/\s+/g,' ').trim();
    wordString = wordString.replace(/[^a-zA-Z ]/g, "").split(" ");
    return wordString;
  }

  $scope.showEtymology = function(item) {
    item.display = true;
  }

  $scope.hideEtymology = function(item) {
    item.display = false;
  }

}]);
