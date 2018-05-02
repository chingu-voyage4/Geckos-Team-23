// Get categories from local storage and add them to select dropdown - runs on document load
(function getCategories() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(keys[i]);
        let ui = document.getElementById('output-links');
        ui.innerHTML += `<li>${keys[i]} <span class="delete-btn float-right">X</span></li><br> `;
    }

    values.forEach(function (value) {
        //Create option element
        const option = document.createElement('option');
        //Create text node and append to li
        option.appendChild(document.createTextNode(value));
        // Get select from HTML
        const select = document.getElementById('select-category');
        // Add option to select
        select.add(option);
    });
})();

/*
=================
Event Listeners 
=================
*/
// Listen for category input
let categoryName = document.getElementById('createNewCategory').value;

document.getElementById('add-category-btn').addEventListener('click', addNewCategory);

// Listen for select from dropdown
const categoryValue = document.getElementById('select-category');

// Listen for save one tab
document.getElementById('saveOneTab').addEventListener('click', getTabUrl);

// Listen for save all tabs
document.getElementById('saveAllTabs').addEventListener('click', getAllWindowUrls);

// Listen for delete all tabs
document.querySelector('.delete-btn').addEventListener('click', deleteCategory);


function generateRandomKey() {
    return '_' + Math.random().toString(36).substr(2, 9);
};


/*
==============================
    ADD CATEGORY INFO SECTION
==============================
*/

// function saveCategorySelection(categoryName) {
//     let categorySelection = categoryName;
//     console.log(categorySelection);
//     return categorySelection;
// }

// Adds new category after 'ADD' button is pressed
function addNewCategory() {
    // Add category name to select list
    const select = document.getElementById('select-category');
    const option = document.createElement("option");
    option.text = document.getElementById('createNewCategory').value;
    // Check that category name is not blank
    if (option.text !== '') {
        select.add(option);
        // Get category name
        let name = option.text;

        // Clear input field
        clearInput();

        // Alert new category added
        showAlert(`${name} category successfully added! Select it from the dropdown below`, 'alert alert-success');
    } else {
        // Alert that category name cannot be blank
        showAlert('Category name cannot be blank', 'alert alert-danger');
    }
}

function deleteCategory() {
    //take in categoryName and remove item

    // Get delete button
    let btn = document.querySelector('.delete-btn');
    // Get parent element and its text
    let parent = btn.parentElement.textContent;
    // Set text as category name
    let categoryName = parent.substr(0, parent.indexOf(' '))
    console.log(categoryName);
    // Delete category
    localStorage.removeItem(categoryName);
    removeFromUI(categoryName);
}


/* 
==========================
    GET TAB (link) INFO
=========================
*/


function getTabUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabURL = tabs[0].url;
        const tabName = tabs[0].title;
        const tabKey = generateRandomKey();
        const categoryName = categoryValue.value;

        if (categoryName === 'Select one...') {
            showAlert('Please select a category', 'alert alert-danger');
        } else {
            addToUI(categoryName, tabName, tabURL);
            //This will be handled by a middleware function. This is for testing only.
            storeCategory(categoryName, tabURL, tabName, tabKey);
        }
    });

}

function getAllWindowUrls() {
    chrome.windows.getAll({ populate: true }, function (windows) {
        windows.forEach(function (window) {
            window.tabs.forEach(function (tab) {
                tabURL = tab.url;
                tabName = tab.title;
                tabKey = generateRandomKey();
                const categoryName = categoryValue.value;

                if (categoryName === 'Select one...') {
                    showAlert('Please select a category', 'alert alert-danger');
                } else {
                    addToUI(categoryName, tabName, tabURL);
                    //This will be handled by a middleware function. This is for testing only.
                    storeCategory(categoryName, tabURL, tabName, tabKey);
                }
            });
        });
    });
}


/*
================================
    LOCAL STORAGE (Testing only)
================================
*/

function storeCategory(categoryName, tabURL, tabName, tabKey) {
    const tabInfo = { categoryName: categoryName, tabName: tabName, tabURL: tabURL, tabKey: tabKey };
    let storedCategory = localStorage.setItem(
        `${categoryName}`,
        JSON.stringify(tabInfo)
    );

}

/*
=============================
    UI CHANGES
=============================
*/

// Show alert message
function showAlert(message, className) {
    // Clear any remaining alerts
    this.clearAlert();
    // Create a div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.main-container');
    // Get searchbox
    const categoryGroup = document.querySelector('#create-category-group');
    // Insert alert
    container.insertBefore(div, categoryGroup);

    //Timeout after 3 seconds
    setTimeout(() => {
        this.clearAlert();
    }, 2000);
}

// Clear alert message
function clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
        //clear current alert if there is one
        currentAlert.remove();
    }
}

function clearInput() {
    document.getElementById('createNewCategory').value = '';
}


// Output to UI
function addToUI(categoryName, tabName, url) {
    let uiOutput = document.getElementById('output-links');

    let output = '';
    output = `
        <li><b> ${categoryName} </b>: <a href="${url}" target="_blank">${tabName}</a> </li>
    `;
    uiOutput.innerHTML += output;
}

// Delete from UI
function removeFromUI(categoryName) {
    let uiOutput = document.getElementById('output-links');
    let btn = document.querySelector('.delete-btn');
    // Get parent element and its text
    let parent = btn.parentElement.innerHTML = ''
    // let output = '';
    // uiOutput.innerHTML += output;
}
