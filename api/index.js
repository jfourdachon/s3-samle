const express = require('express');
const userRouter = require('./routes/user.route')
const cors = require('cors')

const app = express();
const port = 4000;

app.use(cors())

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      data: 'hello-world',
    },
    message: 'Successfully fetched document',
  });
});

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
