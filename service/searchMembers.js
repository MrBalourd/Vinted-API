import puppeteer from "puppeteer";

export async function searchMembers(memberName) {
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

    await page.goto(`https://www.vinted.fr/member/general/search?page=1&search_text=${memberName}`);
    // wait for selector
    await page.waitForSelector(".user-grid");
    await page.waitForSelector("#onetrust-banner-sdk > div");
    
    await page.evaluate(() => {
        const acceptButton = document.querySelector('#onetrust-accept-btn-handler');
        if (acceptButton) {
          acceptButton.click();
        }
      });
      
    
    const users = await page.$$(".user-grid > div.user-grid__item > a");
    console.log(`Found ${users.length} users`);

    
    const userPromises = users.map(async (user, index) => {
        console.log(`Processing user ${index + 1}`);


        const memberName = await user.evaluate(el => el.querySelector(".web_ui__Cell__content > div > div > div > span").textContent);
        const memberId = await user.evaluate(el => el.getAttribute("href").split("/")[2]);
        const memberImage = await user.evaluate(el => el.querySelector("div > div > img").getAttribute("src"));
        const memberRateCount = await user.evaluate(el => el.querySelector(".web_ui__Cell__content > .web_ui__Cell__body > div > .web_ui__Rating__label > h4").textContent);
        
        
        return {
            memberName,
            memberId,
            memberImage,
            memberRateCount
        };
    });
    const processedUsers = await Promise.all(userPromises);
    await browser.close();
    return processedUsers;
}