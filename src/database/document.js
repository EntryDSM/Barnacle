const { client } = require('./mongoDB')

exports.getByGrade = async (grade) => {
	return await client.db('repo')
		.collection('documents')
		.find({ 'writer.grade' : Number(grade) })
		.toArray()
}