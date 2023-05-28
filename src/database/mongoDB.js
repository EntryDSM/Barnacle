const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGO_DB_URI } = process.env;

const client = new MongoClient(MONGO_DB_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

exports.dbConnect = async () => {
	await client.connect();
	await client.db("repo");
	console.log("Successfully connected to MongoDB");

}

exports.getDocumentsByGrade = async (grade) => {
	return await client.db('repo')
		.collection('documents')
		.find({ 'writer.grade' : Number(grade) })
		.toArray()
}