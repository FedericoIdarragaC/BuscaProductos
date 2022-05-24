const express = require('express');
const cors = require('cors');

console.clear();
const app = express();

app.use(cors());
app.use(express.json());

const { productsSearchRouter } = require('./routes/productsSearch');

app.use(productsSearchRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
