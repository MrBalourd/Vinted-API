import puppeteer from "puppeteer";

export async function getMemberItems (memberDress, page)  {
    const memberDressLink = `https://www.vinted.fr/member/${memberDress}`
    try {
        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();

        await page.setRequestInterception(true);

        page.on('request', (req) => {
            if(req.resourceType() === 'stylesheet' || req.resourceType() === 'font'){
                req.abort();
            }
            else {
                req.continue();
            }
        });

        await page.goto(memberDressLink);
        await page.waitForSelector("#onetrust-banner-sdk > div");
        
        await page.evaluate(() => {
            const acceptButton = document.querySelector('#onetrust-accept-btn-handler');
            if (acceptButton) {
              acceptButton.click();
            }
          });
        const memberId = memberDress.split("-")[0];
        await page.goto(`https://www.vinted.fr/api/v2/users/${memberId}/items?page=${page}&per_page=20&order=relevance`)
        // select the pre element int obody
        const dressItemsBased = await page.evaluate(() => {return document.querySelector("pre").textContent})
        const dressItems = JSON.parse(dressItemsBased);
        await browser.close();
        return dressItems
    } catch (e ){
        return e
    }
}