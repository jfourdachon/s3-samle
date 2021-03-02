const express = require('express');
const s3Router = require('./routes/s3.route')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      data: 'hello-world',
    },
    message: 'Successfully fetched document',
  });
});

app.use('/file', s3Router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
