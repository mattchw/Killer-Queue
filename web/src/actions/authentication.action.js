import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import cookie from 'js-cookie';
import api from '../constants/api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS';
export const VALIDATE_TOKEN_FAILURE = 'VALIDATE_TOKEN_FAILURE';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const loginSuccess = user => ({
	type: LOGIN_SUCCESS,
	payload: { user }
});

export const loginFailure = error => ({
	type: LOGIN_FAILURE,
	payload: { error }
});

export const logoutReq = () => ({
	type: LOGOUT,
});

export const validateTokenSuccess = user => ({
	type: VALIDATE_TOKEN_SUCCESS,
	payload: { user }
});

export const validateTokenFailure = error => ({
	type: VALIDATE_TOKEN_FAILURE,
	payload: { error }
});

export const registerSuccess = () => ({
	type: REGISTER_SUCCESS,
});

export const registerFailure = error => ({
	type: REGISTER_FAILURE,
	payload: { error }
});

const login = (username, password) => async (dispatch) => {
	try {
		const params = new URLSearchParams();
		params.append('username', username);
		params.append('password', password);
		params.append('grant_type', 'password');

		var basic = 'Basic ' + new Buffer('application:secret').toString('base64');
		await axios.post(`${api.API_SERVER_URL}/oauth/token`, params, {
			headers: {
				'Authorization': basic
			}
		}).then(res => {
			// const token = {
			// 	accessToken: res.data.accessToken,
			// 	accessTokenExpiresAt: res.data.accessTokenExpiresAt,
			// 	refreshToken: res.data.refreshToken,
			// 	refreshTokenExpiresAt: res.data.refreshTokenExpiresAt,
			// }
			cookie.set('token', res.data.accessToken, {
				expires: 7
			});
			cookie.set('refresh_token', res.data.refreshToken, {
				expires: 30
			});
			localStorage.setItem('user', JSON.stringify(res.data.user));
			dispatch(loginSuccess(res.data.user));
		}).then(()=>{
			return Promise.resolve()
		});
	} catch (error) {
		console.log(error);
		dispatch(loginFailure(error));
	}
};

const logout = () => {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
	cookie.remove('token');
	cookie.remove('refresh_token');
};

const validateToken = (token) => async (dispatch) => {
	try {
		var bearer = 'Bearer ' + token;
		await axios.get(`${api.API_SERVER_URL}/users/check`, {
			headers: {
				'Authorization': bearer
			}
		}).then(res => {
			console.log(res.data);
			dispatch(validateTokenSuccess(res.data.data));
		})
	} catch (error) {
		console.log(error);
		dispatch(validateTokenFailure(error));
		logout();
	}
};

const register = (user) => async (dispatch) => {
	try {
		const type = "Customer";

		if (user.password.length < 8) {
			dispatch(registerFailure("The length of your password should consist at least 8 characters and digits."));
		} else {
			const params = new URLSearchParams();
			params.append('username', user.username);
			params.append('password', sha256(user.password));
			params.append('type', type);

			axios.post(`${api.API_SERVER_URL}/users`, params).then(res => {
				console.log(res.data);
				dispatch(registerSuccess());
			}).catch(err => {
				if (err.response) {
					// client received an error response (5xx, 4xx)
					console.log(err.response.data.err.err_msg);
					dispatch(registerFailure(err.response.data.err.err_msg));
				}
			});
		}
		return Promise.resolve()

	} catch (error) {
		console.log(error);
	}
};

export const authActions = {
	login,
	logout,
	validateToken,
	register
};