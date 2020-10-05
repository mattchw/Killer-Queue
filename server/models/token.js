const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  accessToken: String,
	accessTokenExpiresAt: Date,
	refreshToken: String,
	refreshTokenExpiresAt: Date,
	client: Object,
	user: Object
});

const Token = mongoose.model("tokens", TokenSchema);
module.exports = Token;