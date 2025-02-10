import puppeteer from "puppeteer";
import fetch from "node-fetch";
export async function searchItems(query) {
    const result = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url_request= `https://www.vinted.fr/api/v2/catalog/items?page=1&per_page=96&search_text=${query.text}&catalog_ids=&currency=${query.currency}&size_ids=&brand_ids=&status_ids=&color_ids=&material_ids=`
    await page.goto(url_request);
    const data = await page.evaluate(() => {
        return fetch('https://www.vinted.fr/api/v2/catalog/items?page=1&per_page=96&search_text=robe&catalog_ids=&currency=EUR&size_ids=&brand_ids=&status_ids=&color_ids=&material_ids=')
            .then(response => response.json())
            .then(data => data.items);
    });
    console.log(url_request)
    return data;
}