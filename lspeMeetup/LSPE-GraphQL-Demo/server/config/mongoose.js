let env = process.env.NODE_ENV || 'development',
	config = require('./config')[env],
	mongoose = require('mongoose');

module.exports = function () {
	mongoose.Promise = global.Promise;
	console.log(config);
	let db = mongoose.connect(config.db, { useNewUrlParser: true });
	mongoose.connection.on('error', (err) => {
		console.log('Error: Could not connect to mongodb. Did you forget to run `mongod`?'.red);
	}).on('open', function () {
		console.log('Conenction established with MOngodb')
	})
	return db;
};
