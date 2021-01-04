import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleInputChange = (e, variable) => {
		switch ((e, variable)) {
			case 'email':
				setEmail(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios.get('/sendmail').then((response) => {
			console.log(response);
		});

		axios
			.post('/signin', {
				email,
				password,
			})
			.then(function (response) {
				if (response.data.error) {
					toast(response.data.error, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						className: 'toast_error',
					});
				} else {
					console.log(response);
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('userid', response.data.user._id);
					history.push('/birthday');
				}
			});
	};

	return (
		<div className="auth-wrapper">
			<div className="auth-inner">
				<form>
					<h3>Sign In</h3>

					<div className="form-group">
						<label>Email address</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={(e) => handleInputChange(e, 'email')}
						/>
					</div>

					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							placeholder="Enter password"
							onChange={(e) => handleInputChange(e, 'password')}
						/>
					</div>

					<button
						type="submit"
						className="btn btn-primary btn-block"
						onClick={(e) => handleSubmit(e)}
					>
						Submit
					</button>
					<p className="forgot-password text-right">
						New here <Link to={'/signup'}>sign up?</Link>
					</p>
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</form>
			</div>
		</div>
	);
};

export default Signin;
