const express = require('express');

const server = express();

server.use(express.static(`${__dirname}/dist`));

server.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

server.listen(process.env.PORT || 8085, () => {
  console.log('Server started');
});
