const express = require('express');
const { encargueloScrapper } = require('../scrappers/encarguelo');

const { mercadoLibreScrapper } = require('../scrappers/mercadoLibre');

const productsSearchRouter = express.Router();

productsSearchRouter.get('/api/products', async (req, res) => {
  const { search } = req.query;

  const enc_products = await encargueloScrapper(search);
  const ml_products = await mercadoLibreScrapper(search);

  res.send({
    products: [...enc_products, ...ml_products].sort(
      (a, b) => a.price - b.price
    ),
  });
});

module.exports = { productsSearchRouter };
