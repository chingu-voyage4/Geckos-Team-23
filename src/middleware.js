import * as lsc from './fromRepl';
import * as lst from './tabRepl';
import uniqueID from './genID';

const categoryHandle = "cat-ls";
const tabHandle = "tab-ls";

//================================================================================
// Test functions - delete for production code
const tabs = [
  {
    title: "Cool hello Tutorial",
    url: "https://www.cooldomain.com"
  },
  {
    tabName: "Awesome hello Tutorial",
    tabURL: "https://www.awesomedomain.com"
  }
];

const windows = [
  {
    tabs: [
      {
        title: "Cool world Tutorial",
        url: "https://www.cooldomain.com"
      },
      {
        title: "Awesome world Tutorial",
        url: "https://www.awesomedomain.com"
      }
    ]
  }
];



export function getTabUrl(currentCategory) {
//  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tabURL = tabs[0].url;
    let tabName = tabs[0].title;
    let tabKey = uniqueID();
    let category = retrieveOneCategoryByName(currentCategory[0].name);
    let categoryKey = category[0].id;
//    console.log("getTabUrl - currentCategory, currentCategory.id, currentCategory.name: ", 
//        currentCategory, currentCategory[0].id, currentCategory[0].name);
//    console.log("getTabUrl - category, category.id, category.name: ", category, category.id, category.name);
//    console.log("getTabUrl - tabs[0]: ", tabs[0]);
//    console.log("getTabUrl - params: ", tabKey, categoryKey, tabName, tabURL);
//    addNewTab(tabKey, categoryKey, tabName, tabURL);
//  });
}

export function getAllOpenWindows() {
  let tabURL;
  let tabName;
  let tabKey;
  const categoryKey = 'm7vgaj4p';  // add function call to working function
 console.log("in mw.getAllOpenWindows");
//  chrome.windows.getAll({ populate: true }, function (windows) {
    windows.forEach(function (window) {
      window.tabs.forEach(function (tab) {
        tabURL = tab.url;
        tabName = tab.title;
        tabKey = uniqueID();

//        console.log(tabName + " - " + tabURL);
//        console.log(tabKey);
//        addNewTab(tabKey, categoryKey, tabName, tabURL);
      });
    });
//  });
  //call function to save all tabs to localstorage
}
//================================================================================


// Helpers
export const retrieveCategories = () => {
  let categoryList = lsc.readCategoryComplete(categoryHandle);

  if(categoryList === null){
    return [];
  }

  let categories = categoryList.map((catItem) => { 
    let rObj = {};
    rObj.categoryKey = catItem.id;
    rObj.categoryName = catItem.name;
    return rObj;
  });

  return categories;
}

// Create
export const createNewCategory = (catId, catName) => {
  const categoryKey = catId;
  const categoryName = catName;
  const categoryDateAdded = new Date();

  lsc.addCategory(categoryKey, categoryName, categoryDateAdded, categoryHandle);
}
//*
export const addNewTab = (tabKey, categoryKey, tabName, tabURL) => {
//  console.log("mw.addNewTab - params: ", tabKey, categoryKey, tabName, tabURL);
  lst.addTab(categoryKey, tabKey, tabName, tabURL, tabHandle);
}

// Read
export const retrieveOneCategoryByName = (categoryName) => {
  let categories = lsc.readCategoryComplete(categoryHandle);
//  console.log("mw.retrieveOneCategoryByName - categories: ", categories);
  let category = categories.filter((currentElement, index) => {
		return (currentElement.name === categoryName);
  });
//  console.log("mw.retrieveOneCategoryByName - category: ", category);
  return category;
}

export const retrieveOneCategoryByKey = (categoryKey) => {
  let category = lsc.readCategoryComplete(categoryHandle);
  return category.filter((currentElement, index) => {
		return (currentElement.id === categoryKey);
	});
}

export const getTabGroup = ( categoryName ) => {
  console.log("mw.getTabGroup - category: ", categoryName);
  let category = retrieveOneCategoryByName(categoryName);
  if(category === null) {
    return [];
  }
  let categoryID = category[0].id;
  console.log("mw.getTabGroup - category,category.id: ", category, categoryID);
  let tabList = lst.readTabComplete(tabHandle);
  if(tabList === null){
    return [];
  }
  console.log(tabList);
  console.log("mw.getTabGroup - category, tabList", category, tabList);
  let tabGroup = tabList.filter((currentElement, index) => {
    console.log("filter tabGroup: ", currentElement.categoryKey, categoryID);
		return (currentElement.categoryKey === categoryID);
  });

  console.log("mw.getTabGroup - tabGroup: ", tabGroup);
  return tabGroup;
}

export const retrieveTabs = () => {
  let tabs = lst.readTabComplete(tabHandle);
  if(tabs === null){
    tabs = [];
  }
  return tabs;
}

// Update

// Delete
export const deleteCategory = (categoryId, categoryName) => {
//  console.log("middleware - deleteCategory: " );
  lsc.deleteCategory(categoryId, categoryName, categoryHandle);
}

export const deleteTab = (tabKey, tab) => {
  console.log("mw.deleteTab - tab: ", tab);
  lst.deleteTab(tabKey, tabHandle);
}

export const deleteTabGroup = (categoryName) => {
  console.log("mw.deleteTabGroup - categoryName: ", categoryName);
  let tabList = retrieveTabs();
  // get categoryID
  let category = retrieveOneCategoryByName(categoryName);
  console.log("mw.deleteTabGroup - category: ", category);
//  return; ////////////////////////////////////////////// take me out!!!! ////////////////////////
  if(category === null){
    return;
  }
  let categoryID = category[0].id;

  let tabGroup = tabList.filter((currentElement, index) => {
    console.log("mw.deleteTabGroup - filter c.id, cName", currentElement.categoryKey, categoryID);
    return (currentElement.categoryKey === categoryID);
  });

  if(tabGroup === null){
    console.log("mw.deleteTabGroup === null");
    return;
  }
  console.log("mw.deleteTabGroup - after filter - tabGroup: ", tabGroup);
    
  tabGroup.forEach(function (tab) {
    console.log("mw.deleteTabGroup - forEach - tab: ", tab);
    deleteTab(tab.tabKey, tabHandle);
  });
}



///////////////////////////////////////////
export const getSettings = () => {
  let settings = lsc.getSettings();
//  console.log("mw.getSettings: settings", settings);
  return settings;
}

export const setSettings = (tabWindow, pinnedTab, autoStart) => {
//  console.log("middleware - setSettings: " );
  lsc.setSettings(tabWindow, pinnedTab, autoStart);
}


