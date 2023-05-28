const { processTemplateByDocuments } = require('../file/fileProcessor')
const { generatePdf } = require('../file/pdfGenerator')
const { getDocumentsByGrade } = require('../database/mongoDB')
const express = require("express");

var router = express.Router();

router.post("/", async (req, res) => { 
  const documents = await getDocumentsByGrade(req.query.grade)
  const templates = await processTemplateByDocuments(documents)
  
  res.setHeader('Content-Type', 'application/pdf');
  res.send(
    await generatePdf(templates)
  )
});

module.exports = router;
