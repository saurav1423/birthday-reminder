const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Login = require('../middleware/requireLogin');

router.put('/addfriends', Login, (req, res) => {
	if (
		!req.body.friends.fname ||
		!req.body.friends.fgender ||
		!req.body.friends.fdob
	) {
		return res.json({ error: 'please add all the fields' });
	}
	User.findByIdAndUpdate(
		req.user._id,
		{ $push: { friends: req.body.friends } },
		{ new: true },
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: 'not able to add friends' });
			}
			res.json({ message: 'Saved Successfully!' });
		}
	);
});

router.get('/getfriends', Login, (req, res) => {
	User.find({ friends: req.user._id })
		.populate('fname', 'fgender', 'fdob')
		.then((result) => {
			res.json(result);
		});
});

module.exports = router;
