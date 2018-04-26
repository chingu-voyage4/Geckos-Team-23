"use strict";


//Create the object constructor for tabs
function Tab(tabKey, tabName, tabURL, categoryKey) {
    this.tabKey = tabKey;
    this.tabName = tabName;
    this.tabURL = tabURL;
    this.categoryKey = categoryKey;
};

/**
 * **** --- **** IMPORTANT IMPORTANT IMPORTANT **** --- ****
 * tabsMainDataKey should be assigned the tabKey (The MAIN key for all tab values from local.storage)
 */



//function to retrieve the array of documents in local.storage- the argument to be
//provided is the name of the main key for tabs that you wish to draw results from
// It returns an array of objects that should be assigned to a handler(ie a variable);

const retrievedTabsFromStorage = (tabsMainDataKey) => {
	let allRetrievedTabs = JSON.parse(localStorage.getItem( tabsMainDataKey ));
    return allRetrievedTabs;
    //should be an array of objects - which the functions expect
};

//function takes two arguments one for the local.storage tabkey that it will updated
// and one for the modified array of objects - it will then stringify the
//modified array value and send it back up to be set the tabKey in local.storage.

const setTabsInStorage = (tabsMainDataKey, modifiedArrayVariable) => {
	localStorage.setItem( tabsMainDataKey, JSON.stringify(modifiedArrayVariable) )
};



//******************CREATE**************************
//**************************************************
//function when triggered that will CREATE - a new tab object  in the tabs array in the tabKey
export function addTab(categoryKey, tabKey, tabName, tabURL, tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	if( localStorage === null ){
		localStorage = [];
	}
	let tab = new Tab(tabKey, tabName, tabURL, categoryKey, tabsMainDataKey);
	localStorage.push(tab);
	setTabsInStorage ( tabsMainDataKey, localStorage );
}




//******************READ**************************
//******************READ**************************
//functions triggered that will rquire the tab main data key (i.e tabKey )where in the function is called tabsMainDataKey
// 1. it will call down that main tab key value -(The array of objects and place the array in a variable localStorage)
// 2.  It will then map out and  return a list of each of the documents in the tab main array: the ,tabKey/id, tabName, tabURL, tabsMainDataKey
export function readTabName(tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.tabName;
	});
	return list;
}
//function when trigerred that will READ ALL tab's Id's-
export function readTabKeys(tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.tabKey;
	});
	return list;
}

//function when trigerred that will READ ALL tab URLs from the tabs array
export function readTabURLs(tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.tabURL;
	});
	return list;
}

//function trigerred that will READ ALL TABS properties - all tabs that exist as objects in the array
export function readTabComplete(tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	if(localStorage === null){
		return [];
	}
	let list = localStorage.map((currentElement, index) => {
		return currentElement;
	});
	return list;
}

 //******************UPDATE**************************
 //******************UPDATE**************************

//*****Update the tab id/key by supplying the current id/key you wish to change and the new id/key and tabKey*****
export function updateTabKey(CurrentTabKey, newTabKey, tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if( CurrentTabKey === currentElement.tabKey ) {
			currentElement.tabKey = newTabKey;
		}
    });
    setTabsInStorage ( tabsMainDataKey, localStorage );
}

//*****Update the tab name by supplying the current name you wish to change the new name and tabKey*****

export function updateTabName(CurrentTabName, newTabName, tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if( CurrentTabName === currentElement.tabName ) {
			currentElement.tabName = newTabName;
		}
	});
	setTabsInStorage ( tabsMainDataKey, localStorage );
}
//*****Update the tab URL by supplying the current URL you wish to change  and the new URL and tabKey*****

export function updateTabURL(CurrentTabURL, newTabURL, tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if( CurrentTabURL === currentElement.tabURL ) {
			currentElement.tabURL = newTabURL;
		}
	});
	setTabsInStorage ( tabsMainDataKey, localStorage );
}

//******************DELETE**************************
//**************************************************
//function trigerred that will DELETE - a certain tab from the array body
//based on the tab id 
//requires the tabKey and/or tabName and the main key of the tab (tabKey) from which 
//said person would want to remove the category from
export function deleteTab(tabKey, tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if(tabKey === currentElement.tabKey) {
			localStorage.splice(index, 1);//deletes itself
		}
	});
	setTabsInStorage ( tabsMainDataKey, localStorage );
}

