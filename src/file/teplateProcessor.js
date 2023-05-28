const mustache = require('mustache')
const fs = require('fs')
const path = require('path');

exports.processTemplateByDocuments = async (documents) => {

	const templateHeader = fs.readFileSync(path.join(__dirname, '/templates/template_header.html'))

	const bodyHtml = documents.map(
		(document) => {
			const resumeHtml = fs.readFileSync(
				path.join(__dirname, '/templates/resume_template.html'), 'utf-8'
			)
			documentFormat(document)
			return mustache.render(resumeHtml, document);
		}
	).join('')

	return templateHeader + '<body>' + bodyHtml + '</body>'
}

function documentFormat(document) {

	document.projectList.map((project) => {
		project.startDate = new Intl.DateTimeFormat("ko-KR").format(project.startDate)
		project.endDate = new Intl.DateTimeFormat("ko-KR").format(project.endDate)
	})

	document.awardList.map((award) => {
		award.date = new Intl.DateTimeFormat("ko-KR").format(award.date)
	})

	document.certificateList.map((certificate) => {
		certificate.date = new Intl.DateTimeFormat("ko-KR").format(certificate.date)
	})

	document.writer.studentNumber =
		String(document.writer.grade) +
		String(document.writer.classNum) +
		String((document.writer.number > 9) ? document.writer.number : '0' + document.writer.number)
}