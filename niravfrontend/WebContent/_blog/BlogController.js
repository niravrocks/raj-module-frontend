app.controller('BlogController', function($scope, $rootScope, $location,BlogService) {
	$scope.blog = {
		blogid : '',
		blogname : '',
		userid : '',
		blogdescription : '',
		status : '',
		createddate : '',
		blogcomments : ''
	}
	
	$scope.blogsbysta = [];

	$scope.saveBlog = function() {
		console.log('enteringsave blog in blog controller')
		BlogService.saveBlog($scope.blog).then(function(response) {
			console.log("successfully inserted blog details");
			alert("Create Blog successfully");
			$location.path('/home');
		}, function(response) {
			console.log("failure " + response.status);
			console.log(response.data.message)
			$location.path('/createblog')
		})
	}

	function getAllBlogs() {
		console.log('entering get all blogs')
		BlogService.getAllBlogs().then(function(response) {
			console.log(response.status);
			$scope.blogs = response.data;

		}, function(response) {
			console.log(response.status)
		})

	}
	getAllBlogs();

	$scope.getBlogsByStatus = function(id) {
		console.log('entering get all Blogs by status')
		BlogService.getBlogsByStatus("P").then(function(response) {

			$scope.blogsbysta = response.data;
			console.log("response.status");
		}, function(response) {
			console.log(response.status)
		})

	}

	$scope.deleteBlog = function(id) {
		console.log("entering delete blog in controller with id " + id)
		BlogService.deleteblog(id).then(function(d) {
			console.log('deleted successfully')
			console.log(d)
			getAllBlogs();
			$location.path('/listBlogs')
		}, function() {
			console.log("unable to delete the record")
		})
	}

})
