const puppeteer = require('puppeteer');
const fs = require('fs');

exports.generatePdf = async (html) => {

    console.log(html)
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: [
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    const buffer = await page.pdf({
        printBackground: true,
        format: 'A4'
    });

    await browser.close();

    return buffer
};