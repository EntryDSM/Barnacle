const mustache = require('mustache')
const fs = require('fs')
const path = require('path');

exports.processTemplateByDocuments = async (documents) => {

	const templateHeader = fs.readFileSync(path.join(__dirname, '/templates/template_header'))

	const bodyHtml = documents.map(
		(document) => {
			const resumeHtml = fs.readFileSync(
				path.join(__dirname, '/templates/resume_template'), 'utf-8'
			)
			documentFormat(document)
			return mustache.render(resumeHtml, document);
		}
	).join('')

	return templateHeader + '<body>' + bodyHtml + '</body>'
}

function documentFormat(document) {

	document.projectList.map((project) => {
		project.startDate = formatDate(project.startDate)
		if (project.isPeriod == true) {
		    project.endDate = formatDate(project.endDate)
		} else {
			project.endDate = "진행중"
		}
		if (project.type == "PERSONAL") {
			project.type = "개인프로젝트"
		} else {
			project.type = "팀프로젝트"
		}
	})

	document.awardList.map((award) => {
		award.date = formatDate(award.date)
	})

	document.certificateList.map((certificate) => {
		certificate.date = formatDate(certificate.date)
	})

	document.activityList.map((activity) => {
		activity.date = formatDate(activity.date)
		activity.endDate = formatDate(activity.endDate)
	})

	document.writer.studentNumber =
		String(document.writer.grade) +
		String(document.writer.classNum) +
		String((document.writer.number > 9) ? document.writer.number : '0' + document.writer.number)
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('. ');
}