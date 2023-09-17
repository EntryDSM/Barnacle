const { client } = require('./mongoDB')

exports.getByGradeAndYear = async (grade, year) => {
	return await client.db('repo')
		.collection('documents')
		.find({
			'writer.grade' : Number(grade),
			'year' : Number(year)
		})
		.toArray()
		.then((documents) => 
			documents.map((it) => {
				const writer = it.writer
				if ( writer.grade == '1' ) it.writer.department = '공통과정'
				else if ( writer.classNum == '1' || writer.classNum == '2' ) it.writer.department = '소프트웨어개발과'
				else if ( writer.classNum == '3' ) it.writer.department = '임베디드소프트웨어과'
				else if ( writer.classNum == '4' ) it.writer.department = '정보보안과'
				return it
			})
			.sort(function(a, b)  {
				writerA = a.writer
				writerB = b.writer
				if(writerA.classNum > writerB.classNum) return 1;
				if(writerA.classNum === writerB.classNum) return 0;
				if(writerA.classNum < writerB.classNum) return -1;
			})
			.sort(function(a, b)  {
				if(a.number > b.classNum) return 1;
				if(a.classNum === b.classNum) return 0;
				if(a.classNum < b.classNum) return -1;
			})
		)
}