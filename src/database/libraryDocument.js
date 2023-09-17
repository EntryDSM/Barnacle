const { client } = require('./mongoDB')
const { createBinaryUUID } = require('binary-uuid')

exports.create = async (year, grade, key, documents) => {

    const id = createBinaryUUID().buffer
    var libraryDocument = {
        _class: 'kr.hs.entrydsm.satellite.domain.library.persistence.LibraryDocumentEntity',
        _id: id,
        id: id,
        createdAt: new Date(),
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
            page += it.projectList.length + 1
            return index
		}
    )
}