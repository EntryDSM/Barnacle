const puppeteer = require('puppeteer');
const fs = require('fs');

exports.generatePdf = async (html) => {

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle2' });
    await page.emulateMediaType('screen');

    const buffer = await page.pdf({
        printBackground: true,
        format: 'A4'
    });

    await browser.close();

    return buffer
};