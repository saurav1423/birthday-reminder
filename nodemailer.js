const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const cron = require('node-cron');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { SENDGRID_API } = require('./config/keys');

cron.schedule('00 22 * * *', () => {
	function sedEmail(toEmail, userName, bdayData) {
		const transporter = nodemailer.createTransport(
			sendgridTransport({
				auth: {
					api_key: SENDGRID_API,
				},
			})
		);

		if (bdayData.length == 0) {
			return;
		}
		bdayData.map((bday) => {
			var mailOptions = {
				from: 'birthdayreminderofficial@gmail.com',
				to: toEmail,
				replyTo: 'birthdayreminderofficial@gmail.com',
				subject: 'Your friend have birthday tommorow!',
				text: `Hey dear ${userName}, Your Friend ${bday.fname} have brithday tommorow! `,
			};
			transporter.sendMail(mailOptions, function (err, info) {
				if (err) {
					console.log(err);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});
		});
	}
	User.find({}, function (err, allUsers) {
		if (err) {
			req.flash(
				'error',
				'We seem to be experiencing issues. Please try again later.'
			);
			console.log(err);
			return;
			// return res.redirect('/');
		}
		for (var i = 0; i < allUsers.length; i++) {
			const friends = allUsers[i].friends;

			if (friends.length == 0) {
				continue;
			}
			let todayBirthday = [];
			friends.map((friend) => {
				let bday = friend.fdob;
				let date = bday.split('-')[2];
				let month = bday.split('-')[1];

				let todayDate = new Date();

				if (
					date == todayDate.getDate() + 1 &&
					month == todayDate.getMonth() + 1
				) {
					todayBirthday.push(friend);
				}
			});

			console.log(todayBirthday);

			sedEmail(allUsers[i].email, allUsers[i].name, todayBirthday);
		}
	});
});

//'30 23 * * *'
//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
