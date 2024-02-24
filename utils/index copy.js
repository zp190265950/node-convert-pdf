
const puppeteer = require('puppeteer')
const PDFMerge = require('pdf-merge')
const { PDFDocument } = require('pdf-lib')
const { promises: { readFile, writeFile } } = require('fs')
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
    <div style="page-break-after: always;height: 1900px;">页面Dom1</div>
    <div style="page-break-after: always;height: 1900px;">页面Dom2</div>

  </body>
</html>`
const files = [
  `1.pdf`,
  `2.pdf`
]
async function printPDF(res, data) {
  const browser = await puppeteer.launch()
  // await page.goto('https://www.baidu.com/')
  // console.log(data.htmls);
  // 数组转换
  const { landscape, format, htmls } = data
  // if (!htmls || !Array.isArray(htmls) || !htmls.length) {
  //   res.send({ code: -1, result: '缺少htmls参数' })
  //   return 
  // }
  // const pdfDoc = await PDFDocument.create()
  // for (let i = 0; i < htmls.length; i++) {
  //   const page = await browser.newPage()
  //   await page.setContent(htmls[i], {waitUntil: 'networkidle0'})
  //   console.log(i, 'i');
  //   const fileBufer = await page.pdf({ format, landscape })
  //   const coverDoc = await PDFDocument.load(fileBufer)
  //   const [coverPage] = await pdfDoc.copyPages(coverDoc, [0])
  //   pdfDoc.addPage(coverPage)
  //   // const fileName = `${__dirname}/ceshi${i}.pdf`
  //   // fileList.push(fileName)
  //   // PDFMergeJs.add(fileName)
  // }
  // const pdfBytes = await pdfDoc.save()
  // const pdf_path = 'merged.pdf'
  // // // console.log(pdfBytes);
  // await writeFile(pdf_path, pdfBytes);

  // await PDFMerge(fileList, { output: `${__dirname}merge.pdf` })
  // 生成pdf没有分页,自动分页
  const page = await browser.newPage()
  await page.setContent(htmls, {waitUntil: 'load'})
  await page.pdf({ path: 'ceshi.pdf', format: 'A4', landscape: true, preferCSSPageSize: false, margin: { left: 0, right: 0, top: 0, bottom: 0 } })

  // const page2 = await browser.newPage()
  // await page2.setContent(html, {waitUntil: 'networkidle0'})
  // await page2.pdf({ path: files[1], format: 'A4'})
  // await PDFMerge(files, {output: 'merge.pdf'})
  await browser.close()
  // console.log(resFile);
  res.send({ code: 0, result: 'ok' })
  // return file
}
 
// printPDF()
module.exports = {
  printPDF
}
