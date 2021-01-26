import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signInStart } from '../../redux/user/user.actions';

//material ui
import { Box, Typography, TextField, Button, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Login = ({ signInStart, feedback, currentUser }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorEmail, setErrorEmail] = useState(false);
	const [helperErrorEmail, setHelperErrorEmail] = useState('');
	const [errorPassword, setErrorPassword] = useState(false);
	const [helperErrorPassword, setHelperErrorPassword] = useState('');
	const [isSigningUp, setIsSigningUp] = useState(true);

	const inputChangeHandler = (event) => {
		switch (event.target.name) {
			case 'email':
				return setEmail(event.target.value);
			case 'password':
				return setPassword(event.target.value);
			default:
				return;
		}
	};

	const onSubmit = () => {
		if (email === null || email === undefined || !email.includes('@')) {
			setErrorEmail(true);
			setHelperErrorEmail('Merci de founir une adresse email valide');
			return;
		}
		if (password === null || password === undefined || password.length < 8) {
			setErrorPassword(true);
			setHelperErrorPassword("Merci de founir un password valide d'au moins 8 caractères");
			return;
		}
		signInStart(email, password, isSigningUp);
	};

	return (
		<Box width="40%" m="auto">
			<Box display="flex" flexDirection="column">
				<Paper elevation={2}>
					{ currentUser ? <p>Youre logged in</p> : null }
					<Typography variant="h3" align="center">
						{isSigningUp ? 'Sign Up' : 'Sign In'}
					</Typography>
					<Box m="auto" mt={1} mb={1} width="50%">
						<TextField
							id="outlined-basic"
							label="Adresse e-mail"
							name="email"
							error={errorEmail}
							helperText={helperErrorEmail}
							type="email"
							variant="outlined"
							fullWidth
							onChange={(event) => inputChangeHandler(event)}
						/>
					</Box>
					<Box m="auto" mt={1} mb={1} width="50%">
						<TextField
							id="outlined-basic"
							label="Mot de passe"
							name="password"
							variant="outlined"
							type="password"
							error={errorPassword}
							helperText={helperErrorPassword}
							fullWidth
							onChange={(event) => inputChangeHandler(event)}
						/>
					</Box>
					<Box m="auto" mt={1} mb={1} width="50%" display="flex" justifyContent="center">
						<Button variant="contained" color="primary" onClick={onSubmit}>
							{ isSigningUp ? 'SIGN UP' : 'LOG IN' }
						</Button>
					</Box>
					<Button fullWidth onClick={() => setIsSigningUp((prev) => !prev)}>
						{isSigningUp ? 'Already have an account ? Log in' : 'Create an account'}
					</Button>
					{feedback ? (
						feedback.message ? (
						<Box>
							<Alert severity={feedback.type === 'error' ? 'error' : 'success'}>
								{' '}
								{feedback.message}
							</Alert>
						</Box>
					) : null) : null}
				</Paper>
			</Box>
		</Box>
	);
};

const mapStateToProps = (state) => ({
	feedback: state.user.feedback,
	currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	signInStart: (email, password, isSigningUp) => dispatch(signInStart({ email, password, isSigningUp }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
