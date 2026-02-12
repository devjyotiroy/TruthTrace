let puppeteer;
let chromium;

const isRender = process.env.RENDER === "true";

if (isRender) {
   puppeteer = require("puppeteer-core");
   chromium = require("@sparticuz/chromium");
} else {
   puppeteer = require("puppeteer");
}

async function fetchPolicy(url) {
   let browser;

   try {

      if (isRender) {
         browser = await puppeteer.launch({
            args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
            executablePath: await chromium.executablePath(),
            headless: chromium.headless
         });
      } else {
         browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
         });
      }

      const page = await browser.newPage();

      await page.setUserAgent(
         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      );

      const policyUrls = [
         `${url}/privacy-policy`,
         `${url}/privacy`,
         `${url}/policy`,
         `${url}/privacy.html`,
         `${url}/legal/privacy`
      ];

      for (const policyUrl of policyUrls) {
         try {
            await page.goto(policyUrl, {
               waitUntil: "networkidle2",
               timeout: 10000
            });

            const text = await page.evaluate(() => document.body.innerText);

            if (text && text.length > 100) {
               await browser.close();
               return text.toLowerCase();
            }

         } catch {}
      }

      await browser.close();
      return "Policy not found";

   } catch (error) {
      if (browser) await browser.close();
      return "Policy not found";
   }
}

module.exports = fetchPolicy;
