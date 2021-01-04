const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	friends: [
		{
			fname: String,
			fgender: String,
			fdob: String,
		},
	],
});

mongoose.model('User', userSchema);
