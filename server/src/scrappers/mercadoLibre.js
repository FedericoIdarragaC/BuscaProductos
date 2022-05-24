const puppeteer = require('puppeteer');
const url = 'https://www.mercadolibre.com.co/';

module.exports.mercadoLibreScrapper = async (search) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.type('.nav-search-input', search + '');
  await page.click('.nav-icon-search');
  await page.waitForTimeout(1000);

  const productsCards = await page.$$('.andes-card');
  let products = [];

  for (let prod of productsCards) {
    let newProduct = {};

    newProduct.name = await prod.$eval(
      '.ui-search-item__title',
      (element) => element.innerHTML
    );

    newProduct.imageUrl = await prod.$eval('img', (element) =>
      element.getAttribute('data-src')
    );

    newProduct.url = await prod.$eval('.ui-search-link', (element) =>
      element.getAttribute('href')
    );

    newProduct.price = await prod.$eval('.price-tag-fraction', (element) =>
      element.innerHTML.replaceAll('.', '')
    );

    products = [...products, newProduct];
  }
  await browser.close();

  return products.filter((prod) => prod.imageUrl);
};
