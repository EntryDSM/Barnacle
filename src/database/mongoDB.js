const { MongoClient, ServerApiVersion } = require('mongodb');
const properties = require('../config/properties')

exports.client = new MongoClient(properties.dbUri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

exports.dbConnect = async () => {
	await this.client.connect();
	await this.client.db("repo");
	console.log("Successfully connected to MongoDB");
}