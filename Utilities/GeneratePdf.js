// const puppeteer = require('puppeteer');
// const fs = require('fs-extra');
//
// (async function() {
//     try{
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.setContent("html");
//         await page.emulateMedia('screen');
//         await page.pdf({
//             path:'design.pdf',
//             format:"A4",
//             printBackground:true});
//         await browser.close();
//         // process.exit();
//     }
//     catch (e) {
//         console.log(e);
//     }
// })();
//
