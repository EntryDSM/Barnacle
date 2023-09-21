const { processTemplateByDocuments } = require('../file/teplateProcessor')
const { generatePdf, generatePdfByUrl } = require('../file/pdfGenerator')
const properties = require('../config/properties')
const s3 = require('../file/s3Adapter')
const document = require('../database/document')
const libraryDocument = require('../database/libraryDocument')
const express = require("express");
const fs = require('fs');
var router = express.Router();

router.post("/library", async (req, res) => {
    const {year, grade, documents, pdf} = await checkParamAndGetPdf(req, res);

    const key = await s3.savePdfFile(getFilename(year, grade), pdf)
    libraryDocument.create(year, grade, key, documents)

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf)
});

function getFilename(year, grade) {
  const date = new Date()
  return String(year) + '_' + String(grade) + '_' + date.getFullYear() + date.getMonth() + date.getDay() + ".pdf"
}

router.post("/library/preview", async (req, res) => {
    const {year, grade, documents, pdf} = await checkParamAndGetPdf(req, res);
    /*
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf)
    */
    fs.writeFile("file.pdf", pdf, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Buffer written to file successfully.');
        res.send()
      }
    });
    res.send()
});


async function checkParamAndGetPdf(req, res) {
    checkSecret(req, res)

    if (!req.query['year'] || !req.query['grade']) {
        res.status(400).send()
    }
    const year = req.query.year
    const grade = req.query.grade

    const documents = await document.getByGradeAndYear(grade, year)
    console.log("create pdf file to " + year + ", " + grade + "'s documents")

    const pdf = await generatePdfByDocuments(documents)
    return {year, grade, documents, pdf};
}

async function generatePdfByDocuments(documents) {
    const templates = await processTemplateByDocuments(documents)
    return await generatePdf(templates)
}

function checkSecret(req, res) {
    if (req.query.secret != properties.secret) {
        res.status(403).send()
    }
}

module.exports = router;

/*

2022 repo migration
router.post("/document/test", async (req, res) => {

  const datas = data
    .filter(s => s.gcn.startsWith('2'))

  var page = 0
  const indexes = []
  datas.sort(function(a, b) {
    return parseInt(a.gcn) - parseInt(b.gcn);
})

  merger.reset()
  for (const s of datas) {
    const pdf = await generatePdfByUrl('https://admin.dsm-repo.com/view/' + s.student_id)
    await merger.add(pdf)
    const curPage = page
    page += await getNumPages(pdf)
    console.log(page)
    indexes.push({
      name: s.name,
      major: s.major_tag,
      studentNumber: s.gcn,
      page: curPage
    })
  }

  await merger.save('2022_2_2023610.pdf');

  res.setHeader('Content-Type', 'application/json');
  res.send(indexes)
});

const getNumPages = async (file) => {
  return pdfcounter(file).then(function(data) {
    return data.numpages
  });
}
*/
