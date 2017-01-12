app.controller('EditUserController',function($cookieStore,$scope,$routeParams,$location,UserService){
	//  /edit/:id
	//   /edit/230
	console.log('entering edit user controller ');
	// $routeParams object read the value from the URL path - read the value of id
	var userid=$routeParams.id;
	
	$scope.user=UserService.getUser(userid)
	.then(function(response){
		console.log("status...........=" + response.status)
		$scope.user= response.data;
	}, function(response){
		console.log("error status...........=" + response.status)
	})
	
	//Display the value in editPerson.html page
	$scope.update=function(){
		console.log('update function in editcontroller')
		UserService.updateUser(userid,$scope.user)
	.then(
			//response - object contains details like data, status 
			function(response){
		console.log(response.status)
		$location.path('/listUsers')
		},function(response){
			console.log(response.status)
		})
	}
})