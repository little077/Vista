export default defineBackground(() => {
  browser.runtime.onInstalled.addListener((details) => {
    // 只在首次安装时打开 welcome 页面，并直接进入第一步
    if (details.reason === "install") {
      browser.tabs.create({ url: "page.html?step=1" });
      /**
 * 背景脚本 - 用于绕过网站的iframe嵌入限制
 * 
 * 功能说明：
 * 1. 移除X-Frame-Options响应头 - 这个头部用于防止网站被嵌入到iframe中
 * 2. 移除Content-Security-Policy响应头 - 这个头部包含frame-ancestors指令，也会阻止iframe嵌入
 * 
 * 技术原理：
 * - 使用Browser扩展的declarativeNetRequest API（Manifest V3规范）
 * - 在网页响应返回给浏览器之前，动态修改HTTP响应头
 * - 只针对sub_frame类型的请求（即iframe请求）进行处理
 * 
 * 这样就能让我们的预览窗口成功加载YouTube、Twitter等原本禁止iframe嵌入的网站
 */

      // 等待扩展安装完成后再设置规则
      browser.runtime.onInstalled.addListener(() => {
        // 使用declarativeNetRequest API动态更新网络请求规则
        browser.declarativeNetRequest.updateDynamicRules({
          // 先移除可能存在的旧规则，避免冲突
          removeRuleIds: [1, 2],

          // 添加新的规则来移除阻止iframe嵌入的响应头
          addRules: [
            {
              // 规则1：移除X-Frame-Options头部
              id: 1,                    // 规则的唯一标识符
              priority: 1,              // 规则优先级（数字越大优先级越高）
              action: {
                type: "modifyHeaders" as Browser.declarativeNetRequest.RuleActionType,  // 动作类型：修改响应头
                responseHeaders: [
                  {
                    header: "x-frame-options",           // 要处理的响应头名称
                    operation: "remove" as Browser.declarativeNetRequest.HeaderOperation  // 操作类型：移除
                  }
                ]
              },
              condition: {
                urlFilter: "*",                       // 匹配所有URL
                resourceTypes: ["sub_frame" as Browser.declarativeNetRequest.ResourceType]  // 只处理iframe请求
              }
            },
            {
              // 规则2：移除Content-Security-Policy头部
              id: 2,
              priority: 1,
              action: {
                type: "modifyHeaders" as Browser.declarativeNetRequest.RuleActionType,
                responseHeaders: [
                  {
                    header: "content-security-policy",   // CSP头部通常包含frame-ancestors指令
                    operation: "remove" as Browser.declarativeNetRequest.HeaderOperation
                  }
                ]
              },
              condition: {
                urlFilter: "*",
                resourceTypes: ["sub_frame" as Browser.declarativeNetRequest.ResourceType]
              }
            }
          ]
        }).catch((error) => {
          // 如果规则设置失败，记录错误信息
          console.error('Failed to update declarativeNetRequest rules:', error);
        });
      });
    }
  });

  // 监听扩展图标点击
  browser?.action?.onClicked?.addListener(async (tab,) => {
    const id = tab.windowId
    try {
      // 打开侧边栏
      browser.sidePanel.open({
        windowId: id,
      });
    } catch (error) {
      console.error('打开侧边栏失败:', error);
    }
  });
});