// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const cron = require('node-cron');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { SENDGRID_API } = require('./config/keys');

// cron.schedule('00 23 * * *', () => {
// 	sgMail.setApiKey(SENDGRID_API);
// 	function sedEmail(toEmail, userName, bdayData) {
// 		if (bdayData.length == 0) {
// 			return;
// 		}
// 		bdayData.map((bday) => {
// 			const msg = {
// 				from: 'birthdayreminderofficial@gmail.com',
// 				to: toEmail,
// 				replyTo: 'birthdayreminderofficial@gmail.com',
// 				subject: 'Your friend have birthday tommorow!',
// 				text: `Hey dear ${userName}, Your Friend ${bday.fname} have brithday tommorow! `,
// 			};
// 			sgMail.send(msg).then(
// 				() => {
// 					console.log('email sent');
// 				},
// 				(error) => {
// 					console.error(error);

// 					if (error.response) {
// 						console.error(error.response.body);
// 					}
// 				}
// 			);
// 		});
// 	}
// 	User.find({}, function (err, allUsers) {
// 		if (err) {
// 			req.flash(
// 				'error',
// 				'We seem to be experiencing issues. Please try again later.'
// 			);
// 			console.log(err);
// 			return;
// 		}
// 		for (var i = 0; i < allUsers.length; i++) {
// 			const friends = allUsers[i].friends;

// 			if (friends.length == 0) {
// 				continue;
// 			}
// 			let todayBirthday = [];
// 			friends.map((friend) => {
// 				let bday = friend.fdob;
// 				let date = bday.split('-')[2];
// 				let month = bday.split('-')[1];

// 				let todayDate = new Date();

// 				if (
// 					date == todayDate.getDate() + 1 &&
// 					month == todayDate.getMonth() + 1
// 				) {
// 					todayBirthday.push(friend);
// 				}
// 			});

// 			console.log(todayBirthday);

// 			sedEmail(allUsers[i].email, allUsers[i].name, todayBirthday);
// 		}
// 	});
// });

router.get('/sendmail', (req, res) => {
	// sgMail.setApiKey(SENDGRID_API);
	// function sedEmail(toEmail, userName, bdayData) {
	// 	if (bdayData.length == 0) {
	// 		return res.json({ error: 'error' });
	// 	}
	// 	bdayData.map((bday) => {
	// 		const msg = {
	// 			from: 'birthdayreminderofficial@gmail.com',
	// 			to: toEmail,
	// 			replyTo: 'birthdayreminderofficial@gmail.com',
	// 			subject: 'Your friend have birthday tommorow!',
	// 			text: `Hey dear ${userName}, Your Friend ${bday.fname} have brithday tommorow! `,
	// 		};
	// 		sgMail.send(msg).then(
	// 			() => {
	// 				res.json({ msg: 'success' });
	// 			},
	// 			(error) => {
	// 				console.error(error);

	// 				if (error.response) {
	// 					console.error(error.response.body);
	// 				}
	// 			}
	// 		);
	// 	});
	// }
	// User.find({}, function (err, allUsers) {
	// 	if (err) {
	// 		// req.flash(
	// 		// 	'error',
	// 		// 	'We seem to be experiencing issues. Please try again later.'
	// 		// );
	// 		console.log(err);
	// 		return res.json({ error: 'error' });
	// 	}
	// 	for (var i = 0; i < allUsers.length; i++) {
	// 		const friends = allUsers[i].friends;

	// 		if (friends.length == 0) {
	// 			continue;
	// 		}
	// 		let todayBirthday = [];
	// 		friends.map((friend) => {
	// 			let bday = friend.fdob;
	// 			let date = bday.split('-')[2];
	// 			let month = bday.split('-')[1];

	// 			let todayDate = new Date();

	// 			if (
	// 				date == todayDate.getDate() + 1 &&
	// 				month == todayDate.getMonth() + 1
	// 			) {
	// 				todayBirthday.push(friend);
	// 			}
	// 		});

	// 		console.log(todayBirthday);

	// 		sedEmail(allUsers[i].email, allUsers[i].name, todayBirthday);
	// 	}
	// });
	sgMail.setApiKey(SENDGRID_API);
	const msg = {
		to: 'ramkumar08099@gmail.com',
		from: 'birthdayreminderofficial@gmail.com', // Use the email address or domain you verified above
		subject: 'Sending with Twilio SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	};
	//ES6
	sgMail.send(msg).then(
		() => {
			res.json({ message: 'hellp' });
		},
		(error) => {
			console.error(error);

			if (error.response) {
				console.error(error.response.body);
			}
		}
	);
});

module.exports = router;
