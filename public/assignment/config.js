(function(){
    angular
        .module("FormBuilderApp")
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
            .otherwise({
                redirectTo: "/home"
            });
    }
})();







//(function() {
//	angular
//		.module("FormBuilderApp")
//		.config(Configure);
//		
//	function Configure ($routeProvider) {
//		$routeProvider
//		 	.when("/home", {
//				templateUrl: "home.view.html",
//			})
//			.when("/login", {
//				templateUrl: "login.view.html",
//				controller: "LoginController"
//			})
//			.otherwise({
  //              redirectTo: "/home"
//            });
//		/**	.when("/sidebar/sidebar.view", {
//				templateUrl: "sidebar.view.html",
//				controller: "SidebarController"   
//			}) */
//		//	.when("/register", {
//		//		templateUrl: "register.html"
//		//	}) 
		
//	}
	
//}) (); 