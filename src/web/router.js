const { processTemplateByDocuments } = require('../file/teplateProcessor')
const { generatePdf } = require('../file/pdfGenerator')
const s3 = require('../file/s3Adapter')
const document = require('../database/document')
const libraryDocument = require('../database/libraryDocument')
const express = require("express");

var router = express.Router();

router.post("/", async (req, res) => { 

  const grade = req.query.grade
  const documents = await document.getByGrade(grade)
  const templates = await processTemplateByDocuments(documents)
  
  const pdf = await generatePdf(templates)
  const year = req.query.year
  const fileName = String(year) + '_' + String(grade) + '_' + new Date()
  const key = s3.savePdfFile(fileName, pdf)

  libraryDocument.create(year, grade, key, documents)
  
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdf)
});

module.exports = router;
