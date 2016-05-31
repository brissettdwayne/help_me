var helpmeApp = angular.module("HelpmeApp", []);

helpmeApp.controller("QuestionsController", ["$scope", "$http", "$timeout", function($scope, $http, $timeout){

  $scope.name = '';
  $scope.email = '';
  $scope.subject = '';
  $scope.description = '';

  $http.get('/api/questions').then(function(response){
    $scope.questions = response.data.questions;
    console.log("Sweet.......Data");
  })

  $scope.createQuestion = function() {
    var newQuestion = {
      question: {
        name: $scope.name,
        email: $scope.email,
        subject: $scope.subject,
        description: $scope.description
      }
    }

    $http.post('/api/questions', newQuestion).then(function(response){
      $scope.questions.push(response.data.question);
      console.log(response.data);
      $scope.reset();
    })


  }

  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question.id).then(function(response){
      if(response.status == 200){
        $scope.questions = $scope.questions.filter(function(q){
          return q.id != question.id;
        })
      }
    })
  }

  $scope.reset = function(){
    $scope.name = 'Name';
    $scope.email = 'Email Address';
    $scope.subject = 'Subject';
    $scope.description = 'Question';
  }

}])
