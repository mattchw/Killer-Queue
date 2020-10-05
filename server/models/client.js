const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  id: String,
  clientId: String,
	clientSecret: String,
	grants: [String],
	redirectUris: [String]
});

const Client = mongoose.model("clients", ClientSchema);
module.exports = Client;