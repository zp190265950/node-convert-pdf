# html使用puppeteer转换pdf
使用的node版本 v14.18.0

本地运行步骤
`javascript
  npm install
  node appjs
`
https://puppeteer.bootcss.com/api#class-page
### /utils/index.js 中有两个方法
  convertPagePdfMerge是通过htmls数组类型，加载html后生成pdf文件，合并pdf文件
  convertPDF 是通过前端处理好的html或者iframe文本直接成buffer