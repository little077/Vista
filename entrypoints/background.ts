export default defineBackground(() => {
  browser.runtime.onInstalled.addListener((details) => {
    // 只在首次安装时打开 welcome 页面，并直接进入第一步
    if (details.reason === "install") {
      browser.tabs.create({ url: "page.html?step=1" });
    }
  });

  browser.action.onClicked.addListener(() => {
    browser.tabs.create({ url: "page.html" });
  });
});