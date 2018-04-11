// tabKey: 1,
// categoryKey: 1,
// tabName: "My Favorite React Tutorial",
// tabURL: "https://www.somedomain.com"



// tabKey
// or 
// categoryKey

function Tab(tabKey, tabName, tabURL, categoryKey) {
    this.tabKey = tabKey;
    this.tabName = tabName;
    this.tabURL = tabURL;
    this.categoryKey = categoryKey;
};


//function to retrieve the array of documents in local.storage- the argument to be
//provided is the name of the mainkey that you wish to draw results from
// It returns an array of objects that should be assigned to a handler(ie a variable);
const retrievedTabsFromStorage = (tabsMainDataKey) => {
	let allRetrievedTabs = JSON.parse(localStorage.getItem( tabsMainDataKey ));
    return allRetrievedTabs;
    //should be an array of objects - which the functions expect
};

//function takes two arguments one for the local.storage key that will updated
// and one for the modified array of objects - it will then stringify the
//modified array value and send it back up to be set in local.storage.
const setTabsInStorage = (tabsMainDataKey, modifiedArrayVariable) => {
	localStorage.setItem( tabsMainDataKey, JSON.stringify(modifiedArrayVariable) )
};

//******************CREATE**************************
//**************************************************
//function when triggerred that will CREATE - a new tab object  in the tabs array in the tabKey
function addTab(tabKey, tabName, tabURL, tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	let tab = new Tab(tabKey, tabName, tabURL, tabsMainDataKey);
	localStorage.push(tab);
	setTabsInStorage ( tabsMainDataKey, localStorage );
}

//******************READ**************************
 //******************READ**************************
//**************************************************
//functions triggered that will rquire the tab main data key = tabKey which in the functionis called tabsMainDataKey
// 1. it will call down that main tab key value -(The array of objects and place the array in a variable localStorage)
// 2.  It will then map out and  return a list each of the documents in the tab main array's id's,tabKey, tabName, tabURL, tabsMainDataKey
function readTabName(tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.tabName;
	});
	return list;
	console.log(list);
}
//function when trigerred that will READ ALL tab's Id's-
function readTabKeys(tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.tabKey;
	});
	return list;
	console.log(list);
}
//function when trigerred that will READ ALL URLs from the tabs array
function readTabURLs(tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement.tabURL;
	});
	return list;
	console.log(list);
}
//function trigerred that will READ ALL TABS- all tabs that exist as objects in the array
function readTabComplete(tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	let list = localStorage.map((currentElement, index) => {
		return currentElement;
	});
	return list;
    console.log(list);
}
 //******************UPDATE**************************
 //******************UPDATE**************************


// function Tab(tabKey, tabName, tabURL, categoryKey) {
//     this.tabKey = tabKey;
//     this.tabName = tabName;
//     this.tabURL = tabURL;
//     this.categoryKey = categoryKey;
// };

//*****Update the tab id by supplying the current id you wish to change and  the new id and tabKey*****
function updateTabId(CurrentTabKey, newTabKey, tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if( CurrentTabKey === currentElement.tabKey ) {
			currentElement.tabKey = newTabKey;
		}
    });
    setTabsInStorage ( tabsMainDataKey, localStorage );
	console.log(localStorage);
}
//*****Update the tab name by supplying the current name you wish to change the new name and tabKey*****

function updateTabName(CurrentTabName, newTabName, tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if( CurrentTabName === currentElement.tabName ) {
			currentElement.tabName = newTabName;
		}
	});
	setTabsInStorage ( tabsMainDataKey, localStorage );
	console.log(localStorage);
}

//******************DELETE**************************
//**************************************************
//function trigerred that will DELETE - a certain tab from the array body
//based on either the tab id or the tab name
//requires the tabid and/or tabName and the main key of the tab (tabKey) from which 
//said person would want to remove the category from
function deleteTab(tabKey, tabName, tabsMainDataKey) {
	let localStorage = retrievedTabsFromStorage(tabsMainDataKey);
	localStorage.forEach((currentElement, index) => {
		if(tabKey === currentElement.tabKey  || (tabName === currentElement.tabName)) {
			localStorage.splice(index, 1);//deletes itself
		}
	});
	setTabsInStorage ( tabsMainDataKey, localStorage );
	console.log(localStorage);
}