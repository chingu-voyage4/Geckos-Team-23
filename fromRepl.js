`use strict`;
//****GLOBAL VARIABLES*****
let categories = [];
let retrievedCategories;
let tabs = [];
//****GLOBAL VARIABLES*****


//******************HELPER CONSTRUCTS*************************
//******************HELPER CONSTRUCTS*************************
//******************HELPER CONSTRUCTS*************************
//Create the object constructor for category
function Category(id, name) {
    this.id = id;
    this.name = name;
}
//Create the object constructor for tabs
function Tab(tabKey, tabName, tabURL, categoryKey) {
    this.tabKey = tabKey;
    this.tabName = tabName;
    this.tabURL = tabURL;
    this.categoryKey = categoryKey;
};

const retrievedCategories = () => {
    let retrievedBox = localStorage.getItem('categories');
    let retrievedCategories = JSON.parse(retrievedBox);
    return retrievedCategories;
    //should be an array of objects - which the functions expect
}

//******************CREATE**************************
//**************************************************
//function triggerred that will CREATE - a category in the array categories
function addCategory(categoryId, categoryName) {
	let category = new Category(categoryId, categoryName);
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
 //   console.log(categories, categories.length);
}

//******************READ**************************
//****************WILL NEED**********************************
 //  Everytime function retrievedCategories ()  is called
 // the returned value to be placed in variable and used as the basis
 // as the retireved Category
 //******************READ**************************
//**************************************************
//function trigerred that will READ ALL category names- a categories from the array
function readCategoryName() {
	let list = categories.map((currentElement, index) => {
		return currentElement.name;
	});
	console.log(list);
}
//function trigerred that will READ ALL category Id's- a categories from the array
function readCategoryIds() {
	let list = categories.map((currentElement, index) => {
		return currentElement.id;
	});
	console.log(list);
}
//function trigerred that will READ ALL CATEGORIES- a categories from the array
function readCategoryComplete() {
	let list = categories.map((currentElement, index) => {
		return currentElement;
	});
	console.log(list);
}
//******************UPDATE**************************
//****************WILL NEED**********************************
//   let retrievedBox = localStorage.getItem('categories');
//   let retrievedCategories = JSON.parse(retrievedBox
 //******************UPDATE**************************
//**************************************************
//*****Update the Category ID number - requires a current Id# and supply the new id#*****
function updateCategoryId(CurrentCategoryId, newCategoryId) {
	categories.forEach((currentElement, index) => {
		if( CurrentCategoryId === currentElement.id ) {
			currentElement.id = newCategoryId;
		}
	});
	localStorage.setItem('categories', JSON.stringify(categories));
	console.log(categories);
}
//*****Update the Category ID number - requires a current Id# and supply the new id#*****
//ASSUMING that all names will be unique as well - just as id #'s'
function updateCategoryName(CurrentCategoryName, newCategoryName) {
	categories.forEach((currentElement, index) => {
		if( CurrentCategoryName === currentElement.name ) {
			currentElement.name = newCategoryName;
		}
	});
	localStorage.setItem('categories', JSON.stringify(categories));
	console.log(categories);
}

//******************DELETE**************************
//**************************************************
//function trigerred that will DELETE - a categories from the array
function deleteCategory(categoryId, categoryName) {
	categories.forEach((currentElement, index) => {
		if(categoryId === currentElement.id  || (categoryName === currentElement.name)) {
			categories.splice(index, 1);//deletes itself
		}
	});
	localStorage.setItem('categories', JSON.stringify(categories));
	console.log(categories, categories.length);
}






/**
 * Lets run the app below testApp says howmany instances do you want to create
*/

const testApp = (howMany = 4) => {
    for (let i = 0;i < howMany; i++) {
      addCategory(i, "react");
    }
      console.log(categories, categories.length);
    
  };
  
(() => {
	testApp(2);
	updateCategoryId(1,25);
//	updateCategoryName('react', 'chicken')
//	deleteCategory(2);
//	readCategoryName()
//	readCategoryIds();
//	readCategoryComplete();
})();