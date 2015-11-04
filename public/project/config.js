(function(){
    "use strict";
    angular
        .module("DecisionsApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
             .when("/home",{
                templateUrl: "home/home.view.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html",
                controller: "LoginController"
            }) 
            .when("/register", {
                templateUrl: "register/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/history", {
                templateUrl: "history/history.view.html",
                controller: "HistoryController"
            })
            .when("/question", {
                templateUrl: "question/question.view.html",
                controller: "QuestionController"
            })
            .when("/methodProCon", {
                templateUrl: "methodProCon/methodProCon.view.html",
                controller: "MethodProConController"
            })
            .when("/methodIntuitionOptions", {
                templateUrl: "methodIntuition/methodIntuitionOptions.view.html",
                controller: "MethodIntuitionOptionsController"
            })
            .when("/methodIntuitionEval", {
                templateUrl: "methodIntuition/methodIntuitionEval.view.html",
                controller: "MethodIntuitionEvalController"
            })
            .otherwise({
                redirectTo: "/home"
            });   
    }
})();

