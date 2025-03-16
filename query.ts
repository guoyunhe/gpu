/* eslint-disable no-await-in-loop */
import fs from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const filePath = './public/data.json';

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  defaultViewport: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  },
  // 固定用户数据路径，以记忆登录状态
  userDataDir: './puppeteer-data',
  // 禁用无头模式，方便登录用户
  headless: false,
});

const page = await browser.newPage();

await page.goto('https://search.jd.com/Search?keyword=9070xt');

// 检测 JD 登陆状态，如未登录有 60s 时间完成登陆
await page.waitForSelector('a.nickname', { timeout: 60 * 1000 });

console.log('京东登录成功');

const json = await fs.readFile(filePath, 'utf-8');

const list = JSON.parse(json);

for (const item of list) {
  console.log('-----------');
  console.log(item.model);

  const url = new URL('https://search.jd.com/Search');
  url.searchParams.set('keyword', item.model);
  // 仅显示有货
  url.searchParams.set('stock', '1');
  // 限制显卡分类
  url.searchParams.set('cid3', '679');
  // 限制价格>=1000
  url.searchParams.set('ev', 'exprice_1000gt^');

  await page.goto(url.toString());
  await page.waitForSelector('li.gl-item');
  await page.waitForNetworkIdle();
  let priceList = await page.$$eval('li.gl-item', (products) =>
    Array.from(products)
      .filter((product) => {
        // 排除预约耍猴
        return !product.querySelector('.p-presell-time');
      })
      .map((product) => ({
        sku: product.dataset.sku,
        price: Number(product.querySelector('.p-price i')?.textContent),
      })),
  );

  // 排除 SKU 黑名单
  priceList = priceList.filter((priceItem) => !item.jdBlacklist?.includes(priceItem.sku));

  // 价格排序
  priceList.sort((a, b) => a.price - b.price);
  console.log(priceList);

  // 计算价格中位数
  const middlePrice = priceList[Math.floor(priceList.length / 2)].price;
  console.log('middlePrice', middlePrice);
  item.jdPrice = 999999;
  priceList.forEach((priceItem) => {
    if (
      item.jdPrice > priceItem.price &&
      // 限制在价格中位数-30%
      priceItem.price > middlePrice * 0.7
    ) {
      item.jdPrice = priceItem.price;
      item.jdSku = priceItem.sku;
    }
  });
  item.ratio = item.steelNomad / item.jdPrice;
  console.log(item.jdSku, item.jdPrice);

  await fs.writeFile(filePath, JSON.stringify(list, null, 2));
}

await page.close();
await browser.close();
