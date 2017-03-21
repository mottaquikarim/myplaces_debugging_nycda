// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

// default
db.defaults({
	places: [], 
	locations: [], 
	users: [],
	user_locations: [],
}).write();

// Places manager object
const Places = {};

Places.getLocationsByUser = (user_id) => {
	return db.get('user_locations')
		.filter((currentResult) => {
			return currentResult.user_id === user_id
		})
		.map((currentResult) => {
			return db.get('locations')
				.find({id: currentResult.location_id})
		})
};

Places.addNewLocationForUser = (user_id, payload ) => {
	const locations = db.get('locations');
	console.log(locations.value().length)
	const newLocationToAdd = {};
	newLocationToAdd.id = locations.value().length;
	newLocationToAdd.lat = payload.lat;
	newLocationToAdd.lng = payload.lng;

	locations
		.push(newLocationToAdd)

	db.get('user_locations')
		.push({
			user_id: user_id,
			location_id: newLocationToAdd.id,
		})

	return Places.getLocationsByUser(user_id);
}

