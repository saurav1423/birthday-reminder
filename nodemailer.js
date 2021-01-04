const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { SENDGRID_API } = require('./config/keys');

sgMail.setApiKey(SENDGRID_API);
function sedEmail(toEmail, userName, bdayData) {
	if (bdayData.length == 0) {
		return;
	}
	bdayData.map((bday) => {
		const msg = {
			from: 'birthdayreminderofficial@gmail.com',
			to: toEmail,
			replyTo: 'birthdayreminderofficial@gmail.com',
			subject: 'Your friend have birthday tommorow!',
			text: `Hey dear ${userName}, Your Friend ${bday.fname} have brithday tommorow! `,
		};
		sgMail.send(msg).then(
			() => {},
			(error) => {
				console.error(error);

				if (error.response) {
					console.error(error.response.body);
				}
			}
		);
	});
}
User.find({}, function (err, allUsers) {
	if (err) {
		console.log(err);
		return;
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
