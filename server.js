require('dotenv').load();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const port = Number(process.env.PORT || 4000);
const server = http.createServer(app).listen(port, () => {
  const addr = server.address();
  console.log(`Listening at port ${addr.port}`);
});
