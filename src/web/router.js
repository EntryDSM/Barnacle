const { processTemplateByDocuments } = require('../file/teplateProcessor')
const { generatePdf } = require('../file/pdfGenerator')
const properties = require('../config/properties')
const s3 = require('../file/s3Adapter')
const document = require('../database/document')
const libraryDocument = require('../database/libraryDocument')
const express = require("express");

var router = express.Router();

router.post("/library", async (req, res) => { 

  checkSecret(req, res)
  const year = req.query.year
  const grade = req.query.grade

  const documents = await document.getByGrade(grade)

  const pdf = await generatePdfByDocuments(documents)

  const key = await s3.savePdfFile(getFilename(year, grade), pdf)
  libraryDocument.create(year, grade, key, documents)
  
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdf)
});

async function generatePdfByDocuments(documents) {
  const templates = await processTemplateByDocuments(documents)
  return await generatePdf(templates)
}

function getFilename(year, grade) {
  const date = new Date()
  return String(year) + '_' + String(grade) + '_' + date.getFullYear() + date.getMonth() + date.getDay() + ".pdf"
}

function checkSecret(req, res) {
  if (req.query.secret != properties.secret) {
    res.status(403).send()
  }
}

module.exports = router;
