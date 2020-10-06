import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

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

const login = (username, password) => async (dispatch) => {
	try {
		const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
		params.append('grant_type', 'password');

		var basic = 'Basic ' + new Buffer('application:secret').toString('base64');
		await axios.post('/oauth/token', params, {
        headers: {
          'Authorization': basic
        }
    }).then(res =>{
			dispatch(loginSuccess(res.data));
			localStorage.setItem('user', JSON.stringify(res.data));
		});
		
	} catch (error) {
		console.log(error);
		dispatch(loginFailure(error));
	}
};

const logout = () => {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
};

export const authActions = {
	login,
	logout
};