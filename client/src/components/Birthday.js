import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap';

const Birthday = () => {
	const history = useHistory();

	const [name, setName] = useState('');
	const [gender, setGender] = useState('');
	const [dob, setDob] = useState('');

	const handleInputChange = (e, variable) => {
		switch ((e, variable)) {
			case 'name':
				setName(e.target.value);
				break;
			case 'dob':
				setDob(e.target.value);
				break;
			case 'gender':
				setGender(e.target.value);
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(name, gender, dob);

		fetch('/addfriends', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				friends: {
					fname: name,
					fgender: gender,
					fdob: dob,
				},
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.message) {
					toast(response.message, {
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
				if (response.error) {
					toast(response.error, {
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
					<h3>Add Your Friends</h3>

					<div className="form-group">
						<label>Your Friend Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter Friend Name"
							onChange={(e) => handleInputChange(e, 'name')}
						/>
					</div>

					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>Select Gender</Form.Label>
						<Form.Control
							as="select"
							onChange={(e) => handleInputChange(e, 'gender')}
						>
							<option disabled selected value>
								{' '}
								-- select an option --{' '}
							</option>
							<option>Male</option>
							<option>Female</option>
						</Form.Control>
					</Form.Group>

					<div className="form-group">
						<label>Date of Birth</label>
						<input
							type="date"
							className="form-control"
							placeholder="Enter Date of Birth"
							onChange={(e) => handleInputChange(e, 'dob')}
						/>
					</div>

					<button
						type="submit"
						className="btn btn-primary btn-block"
						onClick={(e) => handleSubmit(e)}
					>
						Add Friend!
					</button>
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

export default Birthday;
