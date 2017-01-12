app.controller('EditJobController',function($scope,$routeParams,$location,JobService){
	//  /edit/:id
	//   /edit/230
	console.log('entering edit job controller ');
	// $routeParams object read the value from the URL path - read the value of id
	var jobid=$routeParams.id;

	console.log('entering edit job controller...for jobid' + jobid);
	
	$scope.job=JobService.getJob(jobid)
	.then(function(response){
		console.log("status...........=" + response.status)
		$scope.job= response.data;
	}, function(response){
		console.log("error status...........=" + response.status)
	})
	
	//Display the value in editPerson.html page
	$scope.update=function(){
		console.log('update function in editcontroller')
		JobService.updateJob(jobid,$scope.job)
	.then(
			//response - object contains details like data, status 
			function(response){
		console.log(response.status)
		$location.path('/listjobs')
		},function(response){
			console.log(response.status)
		})
	}
})