(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($http, $q) {
        
        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;
         
  
        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username="+username+"&password="+password)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function findUserById(id) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
            

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user", user)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function deleteUserById(id) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function updateUser(id, user) {
            var deferred = $q.defer();
            $http.put("/api/assignment/user/"+id , user)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise
        }
    
        
    }
})();         
        
 