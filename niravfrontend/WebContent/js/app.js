var app = angular.module("myApp", ['ngRoute', 'ngCookies', 'myApp.controllers', 'myApp.services' ]);
var app = angular.module("myApp.controllers", []);
var app = angular.module("myApp.services", []);

//var app = angular.module("myApp", [ 'ngRoute', 'ngCookies' ])
app.config(function($routeProvider) {
	console.log('entering configuration')
	$routeProvider
.when('/login', {
		controller : 'UserController',
		templateUrl : '_user/login.html'
	}).when('/home', {
		templateUrl : '_home/home.html'
	}).when('/register', {
		controller : 'UserController',
		templateUrl : '_user/register.html'
	}).when('/getAllUsers', {
		controller : 'UserController',
		templateUrl : '_user/listOfUsers.html'
	}).when('/listUsers', {
		controller : 'UserController',
		templateUrl : '_user/listUsers.html'
	}).when('/edit', {
		controller : 'EditUserController',
		templateUrl : '_user/editUser.html'
	}).when('/editJob', {
		controller : 'EditJobController',
		templateUrl : '_job/editJob.html'
	}).when('/postJob', {
		controller : 'JobController',
		templateUrl : '_job/createJob.html'
	}).when('/listJobs', {
		controller : 'JobController',
		templateUrl : '_job/listJobs.html'
	}).when('/uploadPicture', {
		templateUrl : '_user/uploadPicture.html'
	}).when('/friendsList', {
		controller : 'FriendController',
		templateUrl : '_friend/listOfFriends.html'
	}).when('/pendingRequest', {
		controller : 'FriendController',
		templateUrl : '_friend/pendingRequest.html'
	}).when('/editBlog', {
		controller : 'EditBlogController',
		templateUrl : '_blog/editBlog.html'
	}).when('/editEvent', {
		controller : 'EditEventController',
		templateUrl : '_event/editEvent.html'
	})

	.when('/editNews', {
		controller : 'EditNewsController',
		templateUrl : '_news/editNews.html'
	})

	.when('/postBlog', {
		controller : 'BlogController',
		templateUrl : '_blog/createBlog.html'
	}).when('/postEvent', {
		controller : 'EventController',
		templateUrl : '_event/createEvent.html'
	})

	.when('/postNews', {
		controller : 'NewsController',
		templateUrl : '_news/createNews.html'
	})

	.when('/listBlogs', {
		controller : 'BlogController',
		templateUrl : '_blog/listBlogs.html'
	})

	.when('/listEvents', {
		controller : 'EventController',
		templateUrl : '_event/listEvents.html'
	})

	.when('/listNews', {
		controller : 'NewsController',
		templateUrl : '_news/listNews.html'
	})

	.when('/chat', {
		controller : 'ChatCtrl',
		templateUrl : '_chat/chat.html'
	})

})
app.run(function($cookieStore,$rootScope,$location,UserService){  //entry point
	
	if($rootScope.currentUser==undefined)
		$rootScope.currentUser=$cookieStore.get('currentUser')
		
	$rootScope.logout=function(){
		console.log('logout function')
		delete $rootScope.currentUser;
		$cookieStore.remove('currentUser')
		UserService.logout()
		.then(function(response){
			console.log("logged out successfully..");
			$rootScope.message="Logged out Successfully";
			$location.path('/login')
		},
		function(response){
			console.log(response.status);
		})
		
	}	
})
