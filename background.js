function generateRandomKey() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

function selectCategory() {

}

function getTabUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tabURL = tabs[0].url;
    let tabName = tabs[0].title;
    let tabKey = generateRandomKey();
    //const categoryKey;
    console.log(tabName + " - " + tabURL);
    console.log(tabKey);
    //export addNewTab(tabKey, categoryKey, tabName, tabURL);
  });
}

function getAllOpenWindows() {
  chrome.windows.getAll({ populate: true }, function (windows) {
    windows.forEach(function (window) {
      window.tabs.forEach(function (tab) {
        tabURL = tab.url;
        tabName = tab.title;
        tabKey = generateRandomKey();
        //const categoryKey;
        console.log(tabName + " - " + tabURL);
        console.log(tabKey);
        //export addNewTab(tabKey, categoryKey, tabName, tabURL);
      });
    });
  });
  //call function to save all tabs to localstorage
}

// Create a parent item and two children.
let parent = chrome.contextMenus.create({ title: 'Save to MasterTab' });

let saveOneTab = chrome.contextMenus.create({
  title: 'Save this tab',
  parentId: parent,
  onclick: getTabUrl
});

let saveAllTabs = chrome.contextMenus.create({
  title: 'Save all open tabs',
  parentId: parent,
  onclick: getAllOpenWindows
});



