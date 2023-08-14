import puppeteer from "puppeteer";

export async function getMemberRates(memberDress) {
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
        const rateUrl = `https://www.vinted.fr/api/v2/user_feedbacks?user_id=${memberId}&page=1&per_page=250&by=all`;
        await page.goto(rateUrl)
        // select the pre element int obody
        const dressItemsBased = await page.evaluate(() => {return document.querySelector("pre").textContent})
        const dressItems = JSON.parse(dressItemsBased);
        await browser.close();
        return dressItems
    } catch (e ){
        return e
    }
}