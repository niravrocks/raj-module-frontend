app.factory('JobService', function($http) {
	var jobService = this;
	var BASE_URL = "http://localhost:8078/niravbackend"

	jobService.saveJob = function(job) {
		return $http.post(BASE_URL + "/postJob", job);
	};

	jobService.fetchAllJobs = function() {
		console.log('entering fetchall jobs in job service')
		// '/person' HttpMethod - GET
		return $http.get(BASE_URL + "/jobs").then(function(response) {
			// response - object returned from the back end
			// data, status, headers,statusText
			// data- list of persons
			console.log(response.data)
			console.log(response.status)
			return response.data
		}, function(response) {
			console.log(response.data)
			return response.data
		})
	};

	jobService.getJob=function(id){
		return $http.get(BASE_URL + "/job/" + id)
	};
	
	jobService.updateJob=function(jobid,job){
		console.log('update job in service')
		console.log('job id ' + jobid)
		return $http.put(BASE_URL + "/job/"+jobid, job);
	};

	jobService.deleteJob=function(id){
		console.log("entering delete user in service with id " + id);
		return $http.delete(BASE_URL + "/job/"+id)
		.then(function(response){
			console.log(response.status)
			return response.status;
		},function(response){
			alert("Not authorized to delete job...")
			console.log(response.status)
			})
	
	};

	return jobService;
})