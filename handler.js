import puppeteerLib from "./lib/puppeteer-func";

export const showIP = async (event, context, callback) => {
  let master = null;
  console.log(event.Actor.ID);

  try {
    master = await puppeteerLib.getPuppeteerMaster(event);
    console.log("getPuppeteerMaster init done");
    const page = await master.newPage("https://api.ipify.org");

    console.log("page goto done");
    const html = await page.content();
    console.log("page content done");
    console.log(html);
    event.result = "OK";
    callback(null, event);
  } catch (e) {
    console.log(e);
    callback(e);
  } finally {
    if (master != undefined) {
      //关闭浏览器
      console.log("关闭浏览器");
      await master.close();
    }
  }
};
