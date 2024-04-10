console.log('hello world background')
chrome.action.onClicked.addListener(() => {
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