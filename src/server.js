const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes/routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());

app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
