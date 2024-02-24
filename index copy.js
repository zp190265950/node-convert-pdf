
const puppeteer = require('puppeteer')
const PDFMerge = require('pdf-merge')
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />·
    <title>Document</title>
    <style>
      html {
        line-height: 1.15;
      }
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div style="page-break-after: always;height: 200px;">页面Dom1</div>
    <div style="page-break-after: always;height: 200px;">页面Dom2</div>

  </body>
</html>`
const files = [
  `1.pdf`,
  `2.pdf`
]
async function printPDF() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.setContent(html, {waitUntil: 'networkidle0'})
  await page.pdf({ path: files[0], format: 'A4', landscape: true })
  // const page2 = await browser.newPage()
  // await page2.setContent(html, {waitUntil: 'networkidle0'})
  // await page2.pdf({ path: files[1], format: 'A4'})
  // await PDFMerge(files, {output: 'merge.pdf'})
  await browser.close()
}
 
printPDF()
