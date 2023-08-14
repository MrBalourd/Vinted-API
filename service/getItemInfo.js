import puppeteer from "puppeteer";
import { formatTimeDescription } from "../utils/formatTimeDescription.js";
export async function getItemInfo(itemLink) {
    const ItemsData = [];
    try {
        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();
        await page.goto(itemLink.item);


        // Scrap JSON data
        const itemInfoBased = await page.evaluate(() => { return document.querySelector('script[data-component-name="ItemActions"]').textContent })
        const itemInfoParsed = JSON.parse(itemInfoBased)
        const itemInfo = itemInfoParsed.item;

        const created_at_ts = new Date(itemInfo.created_at_ts);
        const last_logged_on_ts = new Date(itemInfo.user.last_logged_on_ts);
        // Calculate the time description for an article
        const articleTimeDescription = formatTimeDescription(created_at_ts, false); // Replace with your actual article post time

        // Calculate the time description for a login
        const loginTimeDescription = formatTimeDescription(last_logged_on_ts, true); // Replace with your actual login time
        ItemsData.push({
            vendor_infos: [
                {
                    vendor: itemInfo.user.login,
                    photo: itemInfo.user.photo.full_size_url,
                    is_suspicious: itemInfo.user.photo.is_suspicious,
                    id: itemInfo.user.photo.id,
                    last_logged: loginTimeDescription
                }
            ],
            status: itemInfo.status,
            localisation: itemInfo.user.country_title_local,
            title: itemInfo.title,
            description: itemInfo.description,
            package_size: itemInfo.package_size_id,
            created_at_ts: articleTimeDescription,
            favourite_count: itemInfo.favourite_count,
            view_count: itemInfo.view_count,
            pricingInfos: [
                {
                    price: itemInfo.price,
                    currency: itemInfo.currency,
                    service_fee: itemInfo.service_fee,
                    total_item_price: itemInfo.total_item_price,
                }
            ],
            images: itemInfo.photos.map(photo => ({
                isMain: photo.is_main,
                url: photo.url
            }))
        });
        await browser.close();
        return ItemsData;
    } catch (error) {
        console.log(error);

        return error;
    }
}