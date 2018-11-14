let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

let Model = mongoose.model('User', userSchema);
module.exports = Model;
