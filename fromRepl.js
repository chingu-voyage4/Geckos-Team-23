`use strict`;

//****NOTE NOTE function must be made to set the localStorage main key  - to a an Array EARLY*****


(function(categoriesMainDataKey) {
    if ( Object.keys(localStorage).indexOf(categoriesMainDataKey ) === -1 ) {
        localStorage.setItem(categoriesMainDataKey, '[]');  
    }
})();



//******************HELPER CONSTRUCTS*************************
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
//Create the object constructor for tabs -- tabPArentCategoryId will be the id from Category.
function Tab(tabKey, tabName, tabURL, tabParentCategoryId) {
    this.tabKey = tabKey;
    this.tabName = tabName;
    this.tabURL = tabURL;
    this.tabParentCategoryId = tabParentCategoryId;
};



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
const setCategoriesInStorage = (CategoriesMainDataKey, modifiedArrayVariable) => {
	localStorage.setItem( CategoriesMainDataKey, JSON.stringify(modifiedArrayVariable) )
};




//******************CREATE**************************
//**************************************************
//function triggerred that will CREATE - a category in the array categories
function addCategory(categoryId, categoryName, CategoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	let category = new Category(categoryId, categoryName);
	localStorage.push(category);
	setCategoriesInStorage(CategoriesMainDataKey, localStorage);
}

//******************READ**************************
 //******************READ**************************
//**************************************************
//functions triggered that will rquire the main data key
// 1. it will call down that main key value -(The array of objects and place in variable localStorage)
// 2.  It will then map out and  return a list each of the documents in the main array's id's, names or entire contents

function readCategoryName(categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.name;
	});
	return list;
	console.log(list);
}
//function trigerred that will READ ALL category Id's- a categories from the array
function readCategoryIds(categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.id;
	});
	return list;
	console.log(list);
}
//function trigerred that will READ ALL CATEGORIES- a categories from the array
function readCategoryComplete(categoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement;
	});
	return list;
	console.log(list);
}
//******************UPDATE**************************
 //******************UPDATE**************************
//**************************************************


function addCategory(categoryId, categoryName, CategoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	let category = new Category(categoryId, categoryName);
	localStorage.push(category);
	setCategoriesInStorage(CategoriesMainDataKey, localStorage);
}




//*****Update the Category ID number - requires a current Id# and the supply the new id#*****
function updateCategoryId(CurrentCategoryId, newCategoryId, CategoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if( CurrentCategoryId === currentElement.id ) {
			currentElement.id = newCategoryId;
		}
	});
	setCategoriesInStorage(CategoriesMainDataKey, localStorage);
	console.log(localStorage);
}
//*****Update the CategoryName number - requires a current Id# and supply of a new id#*****
//ASSUMING that all names will be unique as well - just as id #'s'
function updateCategoryName(CurrentCategoryName, newCategoryName, CategoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if( CurrentCategoryName === currentElement.name ) {
			currentElement.name = newCategoryName;
		}
	});
	setCategoriesInStorage(CategoriesMainDataKey, localStorage);
	console.log(localStorage);
}

//******************DELETE**************************
//**************************************************
//function trigerred that will DELETE - a category from the array body
//requires the category id and categorname and the main key from which 
//said person would want to remove the category from
function deleteCategory(categoryId, categoryName, CategoriesMainDataKey) {
	let localStorage = retrievedCategoriesFromStorage(categoriesMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if(categoryId === currentElement.id  || (categoryName === currentElement.name)) {
			localStorage.splice(index, 1);//deletes itself
		}
	});
	setCategoriesInStorage(CategoriesMainDataKey, localStorage);
	console.log(localStorage, localStorage.length);
}







/**
 * Lets run the app below testApp says howmany instances do you want to create
*/

// const testApp = (howMany = 4) => {
//     for (let i = 0;i < howMany; i++) {
//       addCategory(i, "react");
//     }
//       console.log(categories, categories.length);
    
//   };
  
// (() => {
// 	testApp(2);
// 	updateCategoryId(1,25);
//	updateCategoryName('react', 'chicken')
//	deleteCategory(2);
//	readCategoryName()
//	readCategoryIds();
//	readCategoryComplete();
// })();














//random number generator
function randomNumber() {
    var x = Math.floor((Math.random() * 1000) + 1);
    return x;
}


// let store = 
// [  { id: 0, name: 'react' },
//    { id: 1, name: 'javascript' },
//    { id: 2, name: 'angular' },
//    { id: 3, name: 'node' } ]

//    localStorage.setItem( 'data', JSON.stringify(store) 
//    And when you get it: let stored = JSON.parse(ocalStorage.getItem( data ))





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

