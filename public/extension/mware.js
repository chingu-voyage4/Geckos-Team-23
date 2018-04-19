import * as lsc from './fromRepl.js';
import * as lst from './tabRepl.js';
import uniqueID from './genID.js';

const categoryHandle = "cat-ls";
const tabHandle = "tab-ls";

export const addNewTab = (tabKey, categoryKey, tabName, tabURL) => {
  lst.addTab(categoryKey, tabKey, tabName, tabURL, tabHandle);
}

export const createNewCategory = (catId, catName) => {
  const categoryKey = catId;
  const categoryName = catName;
  const categoryDateAdded = new Date();

  lsc.addCategory(categoryKey, categoryName, categoryDateAdded, categoryHandle);
}

export const retrieveOneCategoryByName = (categoryName) => {
  let categories = lsc.readCategoryComplete(categoryHandle);
  let category = categories.filter((currentElement, index) => {
		return (currentElement.name === categoryName);
  });
  return category;
}

export const retrieveCategoryNames = () => {
  let catNames = lsc.readCategoryNames(categoryHandle);
  return catNames;
}

export const retrieveCategoryID = () => {
  let catID = lsc.readCategoryNames(categoryHandle);
  return catNames;
}
