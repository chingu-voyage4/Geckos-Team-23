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
function Category(id, name) {
    this.id = id;
    this.name = name;
}

//random number generator
function randomNumber() {
    var x = Math.floor((Math.random() * 1000) + 1);
    return x;
}


//function to retrieve the array of documents in local.storage- the argument to be
//provided is the name of the mainkey that you wish to draw results from
// It returns an array of objects that should be assigned to a handler(ie a variable);
const retrievedCategoriesFromStorage = (categoriesMainDataKey) => {
	let allRetrievedCategories = JSON.parse(localStorage.getItem( categoriesMainDataKey ));
    return allRetrievedCategories;
    //should be an array of objects - which the functions expect
};

//function takes two arguments one for the local.storage key that will updated
// and one for the modified array of objects - it will then stringify the
//modified array value and send it back up to be set in local.storage.
const setCategoriesInStorage = (categoriesMainDataKey, modifiedArrayVariable) => {
	localStorage.setItem( categoriesMainDataKey, JSON.stringify(modifiedArrayVariable) )
};





//******************CREATE**************************
//**************************************************
//function triggerred that will CREATE - a category in the array categories
export function addCategory(categoryId, categoryName, categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	let category = new Category(categoryId, categoryName);
	localStorage.push(category);
	setCategoriesInStorage(categoriesMainDataKey, localStorage);
}





//******************READ**************************
//******************READ**************************
//functions triggered that will rquire the main data key
// 1. it will call down that main key value -(The array of objects and place in variable localStorage)
// 2.  It will then map out and  return a list each of the documents in the main array's id's, names or entire contents

export function readCategoryName(categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.name;
	});
	return list;
	console.log(list);
}
//function trigerred that will READ ALL category Id's- a categories from the array
export function readCategoryIds(categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.id;
	});
	return list;
	console.log(list);
}
//function trigerred that will READ ALL CATEGORIES- a categories from the array
export function readCategoryComplete(categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement;
	});
	return list;
	console.log(list);
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
	console.log(localStorage, localStorage.length);
}


//random number generator
export function randomNumber() {
    var x = Math.floor((Math.random() * 1000) + 1);
    return x;
}





// EXAMPLE CODE
//    { id: 1, name: 'javascript' },
//    { id: 2, name: 'angular' },
//    { id: 3, name: 'node' } ]

//    localStorage.setItem( 'data', JSON.stringify(store) 
//    And when you get it: let stored = JSON.parse(ocalStorage.getItem( data ))





// let store = 
// [ { 
// 	   id: 0,
// 	   name: 'react', 
// 	   tabs: [ 
// 		   {
// 			   tabKey: 0,
// 			   tabName: "learn React syntax",
// 			   tabURL: "htp://www.react.com",
// 			   ParentCategoryId: 1
// 		   },
// 		   {
// 			   tabKey: 1,
// 			   tabName: "videos on syntax",
// 			   tabURL: "htp://www.xyyys.com",
// 			   ParentCategoryId: 1
// 		   },
// 	   ]
//    } 
// ];


   // const setStorageLocal = (categories) => {
// 	chrome.storage.local.set({categories}, function() {
// 		console.log('Value is set to ' + categories);
// 	  });
// }

// function addCategory(categoryId, categoryName) {
// 	let category = new Category(categoryId, categoryName);
// 	categories.push(category);
// 	setStorageLocal(categories);
// }

// const categoryCreatorSaveButton = () => {
// 	var randomIdNumber = randomNumber()
//     var catName = document.getElementById("myText").value;
//     addCategory(randomIdNumber, catName);
// }



// const getStorageLocal = () => {
// 	chrome.storage.local.get(['categories'], function(result) {
// 		console.log('Value currently is ' + result.key);
// 	  });
// }

