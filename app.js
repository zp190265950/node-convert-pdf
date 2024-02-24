const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { convertPDF, convertPagePdfMerge } = require('./utils');

const app = express();
const PROT = 3001

app.use(bodyParser.json({limit: '5000mb'}));
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true}))
app.use(cors());

// 定义GET请求的路由
app.get('/api', (req, res) => {
  res.send('Hello World!');
});

// 定义POST请求的路由
app.post('/convert-pdf', (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*")
  console.log(req.body);
  if (req.body.html) {
    convertPDF(res, req.body)
    return
  }
  convertPagePdfMerge(res, req.body)
  // res.send({ code: 0, result: 'ok' });
});

// 启动服务器
app.listen(PROT, () => {
  console.log(`Server started on port ${PROT}`);
});
