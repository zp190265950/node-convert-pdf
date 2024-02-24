
const puppeteer = require('puppeteer')
const PDFMerge = require('pdf-merge')
const { PDFDocument } = require('pdf-lib')
const { promises: { readFile, writeFile } } = require('fs')
// 数组转换,每一页单独生成使用pdf-lib合并pdf
const convertPagePdfMerge = async (res, data) => {
  const browser = await puppeteer.launch()
  // await page.goto('https://www.baidu.com/')
  const { landscape, format, htmls } = data
  console.log(htmls);
  if (!htmls || !Array.isArray(htmls) || !htmls.length) {
    res.send({ code: -1, result: '缺少htmls参数' })
    return 
  }
  const pdfDoc = await PDFDocument.create()
  for (let i = 0; i < htmls.length; i++) {
    const page = await browser.newPage()
    await page.setContent(htmls[i], {waitUntil: 'networkidle0'})
    console.log(i, 'i');
    const fileBufer = await page.pdf({
      format: format || 'A4',
      landscape: landscape || true,
    })
    const coverDoc = await PDFDocument.load(fileBufer)
    const [coverPage] = await pdfDoc.copyPages(coverDoc, [0])
    // 文档参考
    // https://pdf-lib.js.org/docs/api/classes/pdfdocument#save
    pdfDoc.addPage(coverPage)
  }
  const file = await pdfDoc.save()
  const buffer = Buffer.from(file)
  res.send(buffer)
  // const pdf_path = 'merged.pdf'
  // 把文件写到硬盘中
  // await writeFile(pdf_path, pdfBytes);
}
const convertPDF = async (res, data) => {
  const browser = await puppeteer.launch()
  // await page.goto('https://www.baidu.com/')
  // 数组转换,每一页单独生成使用pdf-lib合并pdf
  const { landscape, format, html } = data
  // 生成pdf没有分页,自动分页
  const page = await browser.newPage()
  await page.setContent(html, {waitUntil: 'load'})
  // 添加path路径会保存到路径下,不添加path路径会返回一个buffer
  const file = await page.pdf({
    // path: 'ceshi.pdf',
    format: format || 'A4',
    landscape: landscape || true,
    preferCSSPageSize: false,
    margin: { left: 0, right: 0, top: 0, bottom: 0 }
  })
  console.log(file);
  res.send(file)
  await browser.close()
  // return file
}
 
// printPDF()
module.exports = {
  convertPagePdfMerge,
  convertPDF
}
