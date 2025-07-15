import hotReload from '@/utils/hotReload'

hotReload()
console.log('this is background main.js')

chrome.browserAction.onClicked.addListener(() => {
  console.log('this is background');
  openWindow();
})

function openWindow() {
  chrome.windows.create({
    url: chrome.runtime.getURL("./popup.html"),
    type: "popup",
    height: 680,
    width: 1280
  })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, '------------sender:----------',sender, sendResponse);

  if (message.action === 'CAPTURE_SCREEN') {
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.captureVisibleTab(sender.tab.windowId, { format: 'png' }, function (dataUrl) {
        console.log('screenshot dataUrl:', dataUrl);
        sendResponse({ screenshot: dataUrl });
      });
    // });
    // 必须返回 true，表示异步响应
    return true;
  }
});