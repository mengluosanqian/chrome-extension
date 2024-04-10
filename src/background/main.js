import hotReload from '@/utils/hotReload'
hotReload()
console.log('this is background')

chrome.action.onClicked.addListener(() => {
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