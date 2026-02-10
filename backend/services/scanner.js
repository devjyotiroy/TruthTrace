const puppeteer = require("puppeteer");

const trackerDomains = [
    "google-analytics", "googletagmanager", "doubleclick", "facebook", "fbcdn",
    "twitter", "linkedin", "analytics", "tracking", "pixel", "adservice",
    "scorecardresearch", "quantserve", "chartbeat", "hotjar", "mouseflow",
    "crazyegg", "mixpanel", "segment", "amplitude", "heap"
];

async function scanWebsite(url) {
    let browser;
    try {
        browser = await puppeteer.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        let trackers = [];

        page.on("request", request => {
            const reqUrl = request.url();
            
            if (trackerDomains.some(domain => reqUrl.includes(domain))) {
                trackers.push(reqUrl);
            }
        });

        await page.goto(url, { 
            waitUntil: "networkidle2", 
            timeout: 30000 
        });
        
        // Wait a bit for dynamic content
        await new Promise(resolve => setTimeout(resolve, 2000));

        await browser.close();

        return [...new Set(trackers)];
    } catch (error) {
        if (browser) await browser.close();
        throw new Error(`Failed to scan website: ${error.message}`);
    }
}

module.exports = scanWebsite;
