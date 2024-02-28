import puppeteer from "puppeteer"
import fs from 'fs'


const selectors = {
    allReviews: '#cm-cr-dp-review-list div.review',
    authorName: 'div[data-hook="genome-widget"] span.a-profile-name',
    reviewTitle: '[data-hook=review-title]>span:not([class])',
    reviewDate: 'span[data-hook=review-date]',
    reviewData: 'span[data-hook=review-body]'
  };

async function start() {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.amazon.com/Cordless-Irrigator-Rechargeable-Waterproof-Irrigation/dp/B0CF5F4QJT/ref=sr_1_28?dib=eyJ2IjoiMSJ9.JrWeLoFiaL1fFXtiZOHntn8hJrQMzDQqBqQF-rY0AGRPVq6IgTl6WHvGNVNGAML7Sphkv6ceghkr5Nj5O1-V-e_0YS_Hl5RS-fsTff8mSSOLPtgvTnYkR2QjX99P8hWCwrUUurRC-2erGye5QHGsOGvSPGnYH4QZPNXVHkL5JwdZLBqTnbRqh8kq-FlNM5AqggFVIKeih3Z_WW32QCqhCm_eQkKWswqAvv0z1lObiIG__JF9x5eAtgz9fxaKd6VvycHNe8KAr4FgVfsRh5ffEKsq9wPfA8SuNvVSFxeaTYk.YsrJcbdkgeMtANW_hPROdfw-mOMvMTrsK8iqu6P4eBU&dib_tag=se&keywords=water+flosser&sr=8-28')
    await page.waitForSelector(selectors.allReviews);
    const reviewElements = await page.$$(selectors.allReviews);
    let reviewDataList = []
    for (const reviewElement of reviewElements) {
        const author = await reviewElement.$eval(selectors.authorName, (element) => element.textContent);
        const title = await reviewElement.$eval(selectors.reviewTitle, (element) => element.textContent);
        const rawReviewDate = await reviewElement.$eval(selectors.reviewDate, (element) => element.textContent);
        const rawReviewData = await reviewElement.$eval(selectors.reviewData, (element) => element.textContent)
        let formattedReviewData = rawReviewData.replace(/\n/g, '').replace("Read more", '').trim();
        const datePattern = /(\w+\s\d{1,2},\s\d{4})/;
        const match = rawReviewDate.match(datePattern);
        const reviewDate = match ? match[0].replace(',', '') : "Date not found";
  
        const reviewData = {
          author,
          title,
          reviewDate,
          formattedReviewData
        };
        
        reviewDataList.push(reviewData)
        
      }
      var myJsonString = JSON.stringify(reviewDataList, null, 2);
      // Write the JSON string to the file
        fs.writeFileSync('ReviewData.JSON', myJsonString);
    await browser.close()
}




start()