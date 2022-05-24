const puppeteer = require('puppeteer');
const url = 'https://encarguelo.com';

module.exports.encargueloScrapper = async (search) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForTimeout(1000);

  await page.type('#searchId1', search + '');

  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);

  await page.screenshot({ path: './screenshot.png' });
  const productsCards = await page.$$('.card-product');
  let products = [];

  for (let prod of productsCards) {
    let newProduct = {};

    newProduct.name = await prod.$eval(
      '.card-product-content a',
      (element) => element.innerHTML
    );

    newProduct.imageUrl = await prod.$eval('.card-product-img', (element) =>
      element.getAttribute('data-src')
    );

    newProduct.url = await prod.$eval(
      'a',
      (element) => 'https://encarguelo.com' + element.getAttribute('href')
    );

    newProduct.price = await prod.$eval(
      'span[class="d-block text-secondary price"]',
      (element) =>
        element.innerHTML
          .split('-')[0]
          .replaceAll(' ', '')
          .replaceAll('$', '')
          .replaceAll('\n', '')
          .replaceAll(',', '')
    );

    products = [...products, newProduct];
  }
  await browser.close();

  return products.filter((prod) => prod.imageUrl);
};
