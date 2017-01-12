app.controller('EventController', function($scope, $rootScope, $location,
		EventService) {
	$scope.event = {
		eventId : '',
		eventName : '',
		eventContent : '',
		eventVenue : '',
		eventDate : '',
		eventTime : ''

	}

	$scope.saveEvent = function() {
		console.log('enteringsave event in event controller')

		EventService.saveEvent($scope.event).then(function(response) {
			console.log("successfully inserted event details");
			alert("Create Event successfully");
			$location.path('/home');
		}, function(response) {
			console.log("failure " + response.status);
			console.log(response.data.message)
			$location.path('/postEvent')
		})
	}

	function getAllEvents() {
		console.log('entering get all events')
		EventService.getAllEvents().then(function(response) {
			console.log(response.status);
			$scope.events = response.data;

		}, function(response) {
			console.log(response.status)
		})

	}
	getAllEvents();

	$scope.deleteEvent = function(id) {
		console.log("entering delete event in controller with id " + id)
		EventService.deleteevent(id).then(function(d) {
			console.log('deleted successfully')
			console.log(d)
			getAllEvents();
			$location.path('/listEvents')
		}, function() {
			console.log("unable to delete the record")
		})
	}

})
