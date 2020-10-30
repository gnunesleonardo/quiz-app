const app = require('./api/express');
const dontenv = require('dotenv').config();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  const host = server.address().address;
  console.log(`API escutando em http://${host}:${port}`);
});