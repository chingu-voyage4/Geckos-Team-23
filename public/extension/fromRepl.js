"use strict";

//****NOTE NOTE function must be made to set the localStorage main key  - to a an Array EARLY*****
// (function(categoriesMainDataKey) {
//     if ( Object.keys(localStorage).indexOf(categoriesMainDataKey ) === -1 ) {
//         localStorage.setItem(categoriesMainDataKey, '[]');  
//     }
// })();
//****NOTE NOTE function must be made to set the localStorage main key  - to a an Array EARLY*****


//******************HELPER CONSTRUCTS*************************
//******************HELPER CONSTRUCTS*************************

//1st retrieve the array of documents from storage then place in variable
//2nd add a document(or modify) {'...' : '...'} to the array
//3rd set the storage.local with command to reinsert the array into Storage.local


//Create the object constructor for category
function Category(id, name, date) {
    this.id = id;
		this.name = name;
		this.date = date;
}

//random number generator
//function randomNumber() {
//    var x = Math.floor((Math.random() * 1000) + 1);
//    return x;
//}


//function to retrieve the array of documents in local.storage- the argument to be
//provided is the name of the mainkey that you wish to draw results from
// It returns an array of objects that should be assigned to a handler(ie a variable);
export const retrievedCategoriesFromStorage =(categoriesMainDataKey)  => {
	let allRetrievedCategories = JSON.parse(localStorage.getItem( categoriesMainDataKey ));
//	console.log("retrievedCategoriesFromStorage: ",allRetrievedCategories);
    return allRetrievedCategories;
    //should be an array of objects - which the functions expect
}

//function takes two arguments one for the local.storage key that will updated
// and one for the modified array of objects - it will then stringify the
//modified array value and send it back up to be set in local.storage.
const setCategoriesInStorage = (categoriesMainDataKey, modifiedArrayVariable) => {
	localStorage.setItem( categoriesMainDataKey, JSON.stringify(modifiedArrayVariable) );
}





//******************CREATE**************************
//**************************************************
//function triggerred that will CREATE - a category in the array categories

export function addCategory(categoryId, categoryName, categoryDate, categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	if( localStorage === null ){
		localStorage = [];
	}
	let category = new Category(categoryId, categoryName, categoryDate);
	localStorage.push(category);
	setCategoriesInStorage(categoriesMainDataKey, localStorage);
}





//******************READ**************************
//******************READ**************************
//functions triggered that will rquire the main data key
// 1. it will call down that main key value -(The array of objects and place in variable localStorage)
// 2.  It will then map out and  return a list each of the documents in the main array's id's, names or entire contents
export const retrieveOneCategory = (categoryID, categoriesMainDataKey) => {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	if(localStorage === null){
		return [];
	}
	console.log(localStorage);
	let list = localStorage.filter((currentElement, index) => {
		currentElement.id === categoryID;
	});
	console.log(list);

}

export function readCategoryNames(categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	if(localStorage === null){
		return [];
	}
	console.log("lsc.readCategoryNames - localStorage: ", localStorage)
	let list = localStorage.map((currentElement, index) => {
		console.log("currentElement: ", currentElement, currentElement.name);
		return currentElement.name;
	});
	console.log(list);
	return list;

}
//function trigerred that will READ ALL category Id's- a categories from the array
export function readCategoryIds(categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	if(localStorage === null){
		return [];
	}
	let list = localStorage.map((currentElement, index) => {
		return currentElement.id;
	});
	console.log(list);
	return list;
}
//function trigerred that will READ ALL CATEGORIES- a categories from the array
export function readCategoryComplete(categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	if(localStorage === null){
		localStorage = [];
	}
//	console.log("readCategoryComplete", localStorage);
	return localStorage;
//	let list = localStorage.map((currentElement, index) => {
//		currentElement;
//	});
//	console.log("readCategoryComplete", list);
//	return list;
}






//******************UPDATE**************************
//******************UPDATE**************************

//*****Update the Category ID number - requires a current Id# and the supply the new id#*****
export function updateCategoryId(CurrentCategoryId, newCategoryId, categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if( CurrentCategoryId === currentElement.id ) {
			currentElement.id = newCategoryId;
		}
	});
	setCategoriesInStorage(categoriesMainDataKey, localStorage);
	console.log(localStorage);
}
//*****Update the CategoryName number - requires a current Id# and supply of a new id#*****
//ASSUMING that all names will be unique as well - just as id #'s'
export function updateCategoryName(CurrentCategoryName, newCategoryName, categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if( CurrentCategoryName === currentElement.name ) {
			currentElement.name = newCategoryName;
		}
	});
	setCategoriesInStorage(categoriesMainDataKey, localStorage);
	console.log(localStorage);
}




//******************DELETE**************************
//**************************************************
//function trigerred that will DELETE - a category from the array body
//requires the category id and categorname and the main key from which 
//said person would want to remove the category from
export function deleteCategory(categoryId, categoryName, categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if(categoryId === currentElement.id  || (categoryName === currentElement.name)) {
			localStorage.splice(index, 1);//deletes itself
		}
	});
	setCategoriesInStorage(categoriesMainDataKey, localStorage);
//	console.log(localStorage, localStorage.length);
}


//random number generator
export function randomNumber() {
    var x = Math.floor((Math.random() * 1000) + 1);
    return x;
}

//****************** React state.settings *************************
//****************** React state.settings *************************
export const getSettings = () => {
	let settingsObj = localStorage.getItem('settings');
	if (settingsObj){
		return JSON.parse(settingsObj);
	} else
	{ 
		return settingsObj = null; 
	}
}

export const setSettings = (tabWindow, pinnedTab, autoStart) => {
	let settings = {};
	settings.tabWindow = tabWindow;
	settings.pinnedTab = pinnedTab;
	settings.autoStart = autoStart;
	localStorage.setItem('settings', JSON.stringify(settings));
}
//****************** React state.settings *************************
//****************** React state.settings *************************


