# Backend Server

## Setup

First, you should have [MongoDB](https://www.mongodb.com/) installed and running on your machine.

You also need to install **nodejs** and **npm** and then, simply run `npm install` and `npm start`. The server should now be running at `http://localhost:3000`.

## Usage

You can use different grant types to get an access token. By now, `password` and `refresh_token` are available.

#### With *password* grant

You need to add a client. For example:

* **clientId**: `application`
* **clientSecret**: `secret`

And you have to add a user too. For example:

* **username**: `test`
* **password**: `test1234`

You don't need any user to use this grant type, but for security is only available to confidential clients.

#### With *refresh_token* grant

There is one client added to server and ready to work:

* **clientId**: `application`
* **clientSecret**: `secret`

You don't need any user to use this grant type, it was already provided when original token was obtained (by *password* grant type, for example).

### Obtaining a token

To obtain a token you should POST to `http://localhost:3000/oauth/token`.

#### With *password* grant

You need to include the client credentials in request headers and the user credentials and grant type in request body:

* **Headers**
	* **Authorization**: `"Basic " + clientId:clientSecret base64'd`
		* (for example, to use `application:secret`, you should send `Basic YXBwbGljYXRpb246c2VjcmV0`)
	* **Content-Type**: `application/x-www-form-urlencoded`
* **Body**
	* `grant_type=password&username=test&password=test1234`
		* (contains 3 parameters: `grant_type`, `username` and `password`)

For example, using `curl`:
```
curl http://localhost:3000/oauth/token \
	-d "grant_type=password" \
	-d "username=test" \
	-d "password=test1234" \
	-H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" \
	-H "Content-Type: application/x-www-form-urlencoded"
```

If all goes as planned, you should receive a response like this:

```
{
	"accessToken": "951d6f603c2ce322c5def00ce58952ed2d096a72",
	"accessTokenExpiresAt": "2018-11-18T16:18:25.852Z",
	"refreshToken": "67c8300ad53efa493c2278acf12d92bdb71832f9",
	"refreshTokenExpiresAt": "2018-12-02T15:18:25.852Z",
	"client": {
		"id": "application"
	},
	"user": {
		"id": "test"
	}
}
```

#### With *refresh_token* grant

When obtaining an access token using *password* grant, you get also a refresh token.
With this token you can get a new access token, using only that value (username and password are not needed), while it has not been expired.

> Remember that, if you refresh a token while it was still valid, the old access and refresh tokens get revoked, and only the new access and refresh tokens are valid to be used.
You need to include the client credentials in request headers and the refresh token and grant type in request body:

* **Headers**
	* **Authorization**: `"Basic " + clientId:clientSecret base64'd`
		* (for example, to use `application:secret`, you should send `Basic YXBwbGljYXRpb246c2VjcmV0`)

	* **Content-Type**: `application/x-www-form-urlencoded`
* **Body**
	* `grant_type=refresh_token&refresh_token=67c8300ad53efa493c2278acf12d92bdb71832f9`
		* (contains 2 parameters: `grant_type` and `refresh_token`)

For example, using `curl`:
```
curl http://localhost:3000/oauth/token \
	-d "grant_type=refresh_token" \
	-d "refresh_token=67c8300ad53efa493c2278acf12d92bdb71832f9" \
	-H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" \
	-H "Content-Type: application/x-www-form-urlencoded"
```

If all goes as planned, you should receive a response like this:

```
{
	"accessToken": "17be4ee45b177651db3fd9d286042de75d48eb3b",
	"accessTokenExpiresAt": "2018-11-18T16:18:35.248Z",
	"refreshToken": "37eaff895c8fc9fc839c0098cf3fb01858097908",
	"refreshTokenExpiresAt": "2018-12-02T15:18:35.248Z",
	"client": {
		"id": "application"
	},
	"user": {
		"id": "test"
	}
}
```

### Using the token

Now, you can use your brand-new token to access restricted areas. For example, you can GET to `http://localhost:3000/` including your token at headers:

* **Headers**
	* **Authorization**: `"Bearer " + accessToken`
		* (for example, `Bearer 951d6f603c2ce322c5def00ce58952ed2d096a72`)

For example, using `curl`:
```
curl http://localhost:3000 \
	-H "Authorization: Bearer 951d6f603c2ce322c5def00ce58952ed2d096a72"
```
