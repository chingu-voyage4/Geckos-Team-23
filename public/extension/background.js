import { retrieveCategoryNames } from './mware.js';
import { getTabUrl, getAllOpenWindows } from './addTab.js';

// Test Data
//let categories = [
//    { id: 'abc', name: 'doReMi'},
//    { id: '123', name: 'React'}
//];

let categories = retrieveCategoryNames();

const doNothing = () => {
  console.log("do Nothing");
}
// Create a parent item and two children.
let parent = chrome.contextMenus.create({ title: 'Save to MasterTab' });

let saveOneTab = chrome.contextMenus.create({
  id: 'saveOneTab',
  title: 'Save this tab',
  parentId: parent,
  onclick: getTabUrl
});

let saveAllTabs = chrome.contextMenus.create({
  id: 'saveAllTabs',
  title: 'Save all open tabs',
  parentId: parent,
  onclick: getAllOpenWindows
});

// Keep for testing, then remove - emmie
// Create a category menu
//  categories.forEach((category, i) => {
//    var id = chrome.contextMenus.create({
//      title: category.name,
//      parentId: saveOneTab,
//      id: category + i,
//      onclick: getTabUrl(category.name)
//    });
//  });

// ****************************************************** //
// ****************************************************** //
//      Use this code to build Category Menu
// ****************************************************** //
// ****************************************************** //
    buildCategoryList(categories, 'saveOneTab', 'SOT_'); //pass original array and main_ID in first call
    buildCategoryList(categories, 'saveAllTabs', 'SAT_'); //pass original array and main_ID in first call

function buildCategoryList(categoryArray, menuParent, menuPrefix) {
    for (var i=0, l=categoryArray.length; i<l; i++) { //loop trough passed data
        var categoryName = categoryArray[i];
        var catId = menuPrefix + categoryName; //create random unique ID for new items, I'm using id's from my notes
        var catName = categoryName; //create item title, I'm using text from my notes

        chrome.contextMenus.create({ //create CTX item
            id: catId,//for ID use previously created
            parentId: menuParent,//for parent ID use second passed argument in function
            title: catName,//for title use previously creted text (or whatever)
            onclick: getTabUrl
        });
    }
}