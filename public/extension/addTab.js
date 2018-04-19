import * as mw from './mware.js';
import uniqueID from './genID.js';

const getCategoryID = (categoryName) => {
  let category = mw.retrieveOneCategoryByName(categoryName);
  console.log("getCategoryID - category: ", category);
  return category[0].id;
}

export function getTabUrl(a) {
  let categoryName = a.menuItemId.substring(4);
  const categoryKey = getCategoryID(categoryName);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tabURL = tabs[0].url;
    let tabName = tabs[0].title;
    let tabKey = uniqueID();

//    console.log("getTabURL: ", tabName + " - " + tabURL);
//    console.log("getTabURL: ", tabKey);
//    console.log("getTabURL - categoryKey: ", categoryKey);
    mw.addNewTab(tabKey, categoryKey, tabName, tabURL);
    let category = mw.retrieveOneCategoryByName(categoryName);
//    console.log("getTabURL - category: ", category);
  });
}

export function getAllOpenWindows(){
  console.log("in getAllOpenWindows");
}


