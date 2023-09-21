const puppeteer = require('puppeteer');
const fs = require('fs');

exports.generatePdf = async (html) => {

    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: [
          '--window-size=1244,880',
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 880,
      height: 1244
    });

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    const buffer = await page.pdf({
        printBackground: true,
        format: 'A4',
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        scale: 1.35
    });

    await browser.close();

    return buffer
};