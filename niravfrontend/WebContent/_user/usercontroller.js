//app.controller('UserController', function($scope, $rootScope,$cookieStore,$location, UserService) {
app.controller('UserController', function($cookieStore,$scope, $rootScope,$cookieStore,$location, UserService) {
	$scope.users;
	$scope.friends1;
	$scope.user = {
		id : '',
		username : '',
		password : '',
		email : '',
		role : '',
		isOnline : '',
		enabled : ''
	};
	
	$scope.message;
	$scope.errorMessage;
	
	
	$scope.submit=function(){
		console.log('Entering - submit function in usercontroller')
		UserService.authenticate($scope.user)
		.then(function(response){
				$scope.user=response.data;
				$rootScope.currentUser=$scope.user;
				//key and value pair 
				$cookieStore.put('currentUser',$rootScope.currentUser)
				console.log('currentUser in rootScope ' + $rootScope.currentUser.id)
				$location.path("/home");
		},
		function(response){//invalid user name and password - failure 
			 console.log('invalid username and password')
			  $scope.message="Invalid Username and Password";
			  $location.path("/login");
		})
	}
	function fetchAllUsers(){
		console.log('entering fetchall users in user controller')
		UserService.fetchAllUsers().then(
				function(d){
					$scope.users=d;
				},
				function(error){
					console.log(error);
				}
		)
	}
	fetchAllUsers();

	$scope.submit = function() {
		console.log('Entering - submit function in usercontroller')
		UserService.authenticate($scope.user).then(function(response) {
			$scope.user = response.data;
			$rootScope.currentUser=$scope.user;
			fetchAllUsers();
			$location.path("/listUsers");
		}, function(response) {// invalid user name and password - failure
			console.log('invalid username and password')
			$scope.message = "Invalid Username and Password";
			$location.path("/login");
		})

	}
	
	$scope.registerUser=function(){
		console.log('entering registerUser')
		UserService.registerUser($scope.user)
		.then(function(response){ //success 
			//response.data => user object
			console.log("registration success" + response.status)
			$scope.message="Registration successfull.. login using username and password.."
			$location.path("/home");
		},function(response) {// failure
					console.log("registration failed" + response.status)
					console.log(response.data)
					$scope.errorMessage = "Registration failed...."
							+ response.data.message
					$location.path("/register")
				})
	}
	

	$rootScope.logout=function(){
			console.log('logout function')
			delete $rootScope.currentUser;
			
			UserService.logout()
			.then(function(response){
				console.log("logged out successfully..");
				$scope.message="Logged out Successfully";
				$location.path('/login')
			},
			function(response){
				console.log(response.status);
			})
			
		}
	
	
	$scope.deleteUser=function(id){
		console.log("entering delete user in controller with id " + id)
		UserService.deleteUser(id).then(
				function(d){
			console.log('deleted successfully')
			console.log(d)
			fetchAllUsers();
			$location.path('/listUsers')
		},function(){
			console.log("unable to delete the record")
		})
		
	}
	
	$scope.friendRequest=function(username){
		alert('friendRequest in userController')
		console.log('friendrequest function')
		UserService.friendRequest(username)
		.then(function(response){
			console.log(response.status);
			alert('Friend request Send')
			getAllUsers();
			$location.path('/getAllUsers')
		},
		function(response){
			console.log(response.status);
		})
		}
	
	function getAllUsers(){
		console.log('entering get all users ')
		UserService.getAllUsers()
		.then(function(response){
		console.log(response.status)
		console.log(response.data)
		$scope.friends1=response.data
		},function(response){
			console.log(response.status)
		}
		)
	}
	getAllUsers()

		
})