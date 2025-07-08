const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const sizes = [16, 48, 128];
  
  for (const size of sizes) {
    await page.setViewport({ width: size, height: size });
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            width: ${size}px;
            height: ${size}px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0078d4;
            font-family: Arial, sans-serif;
          }
          .icon {
            color: white;
            font-size: ${size * 0.5}px;
            font-weight: bold;
            text-align: center;
          }
          .border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: ${size * 0.05}px solid #005a9e;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        <div class="border"></div>
        <div class="icon">AI</div>
      </body>
      </html>
    `;
    
    await page.setContent(html);
    
    const outputPath = path.join(__dirname, '..', 'extensions', 'azure-appinsights-guid-navigator', `icon${size}.png`);
    await page.screenshot({ 
      path: outputPath,
      omitBackground: false
    });
    
    console.log(`Generated icon${size}.png`);
  }
  
  await browser.close();
  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);