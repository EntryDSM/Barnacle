const { client } = require('./mongoDB')

exports.create = async (year, grade, key, documents) => {

    var libraryDocument = {
        year: year,
        grade: grade,
        filePath: key,
        accessRight: 'PRIVATE',
        index: calculateIndex(documents)
    }

	await client
        .db("repo")
        .collection('libraryDocuments')
        .insertOne(libraryDocument)
}

function calculateIndex(documents) {
    var page = 0;
    return documents.map(
        (it) => {
            var index = {
                name: it.writer.name,
                major: it.writer.majorName,
                studentNumber: it.writer.studentNumber,
                page: page
            }
            page += it.projectList.size + 1
            return index
		}
    )
}