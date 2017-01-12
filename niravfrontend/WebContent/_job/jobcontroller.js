app.controller('JobController', function($scope, $rootScope,$location,$routeParams, JobService) {
	$scope.jobs;
	$scope.job = {
			jobId : '',
			hasexpired : '',
			jobDescription : '',
			jobTitle : '',
			location : '',
			postedon : '',
			salary : '',
			skillsRequired : '',
			status : '',
			validity : ''
	}

	$scope.showJobDetail=false
	$scope.saveJob=function(){
		console.log('entering save job in job controller')
		JobService.saveJob($scope.job)
		.then(function(response){
			console.log("successfully inserted job details");
			alert("Posted job successfully");
			$location.path('/home');
		},function(response){
			console.log("failure " +response.status);
			if(response.status==401){
				$location.path('/login')
			}
			else{
			console.log(response.data.message)
			$location.path('/postJob')
			}
		})
	}
	function fetchAllJobs(){
		console.log('entering fetchall jobs in job controller')
		JobService.fetchAllJobs().then(
				function(d){
					$scope.jobs=d;
				},
				function(error){
					console.log(error);
				}
		)
	}
	fetchAllJobs();


	$scope.getJobDetail=function(jobId){
		$scope.showJobDetail=true;
		JobService.getJobDetail(jobId)
	.then(function(response){
		$scope.jobDetail=response.data; // single Job object
		console.log(response.status)
		
	},function(response){
		console.log(response.status)
	})

	}
	
	
	/*function getAllJobs() {
		console.log('entering get all jobs')
		JobService.getAllJobs().then(function(response) {
			console.log(response.status);
			$scope.jobs = response.data;

		}, function(response) {
			console.log(response.status)
		})

	}
	getAllJobs();*/

	$scope.deleteJob=function(id){
		console.log("entering delete user in controller with id " + id)
		JobService.deleteJob(id).then(
				function(d){
			console.log('deleted successfully')
			console.log(d)
			fetchAllJobs();
			$location.path('/listJob')
		},function(){
			console.log("unable to delete the record")
		})
		
	}
})
