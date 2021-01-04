import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleInputChange = (e, variable) => {
		switch ((e, variable)) {
			case 'name':
				setName(e.target.value);
				break;
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

		axios
			.post('/signup', {
				name,
				email,
				password,
			})
			.then(function (response) {
				if (response.data.message) {
					toast(response.data.message, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						className: 'toast_success',
					});
				}
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
				}
			});
	};

	return (
		<div className="auth-wrapper">
			<div className="auth-inner">
				<form>
					<h3>Sign Up</h3>

					<div className="form-group">
						<label>Your Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Your Name"
							onChange={(e) => handleInputChange(e, 'name')}
						/>
					</div>

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
						onClick={(e) => handleSubmit(e)}
						className="btn btn-primary btn-block"
					>
						Sign Up
					</button>
					<p className="forgot-password text-right">
						Already registered <Link to={'/signin'}>sign in?</Link>
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

export default Signup;
