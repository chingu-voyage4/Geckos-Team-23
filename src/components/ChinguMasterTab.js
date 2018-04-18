import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import Settings from './Settings';
import TabGroup from './TabGroup';
import Welcome from './Welcome';
import uniqueID from '../genID';
import * as mw from '../middleware.js';

class ChinguMasterTab extends Component {
  constructor(){
    super();

    this.handleNewCategory = this.handleNewCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.deleteTabGroup = this.deleteTabGroup.bind(this);

    this.deleteTab = this.deleteTab.bind(this);

    this.updateTabWindow = this.updateTabWindow.bind(this);
    this.updatePinnedTabs = this.updatePinnedTabs.bind(this);
    this.updateAutoStart = this.updateAutoStart.bind(this);
    this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);
    this.getTabGroup = this.getTabGroup.bind(this);
    

    this.state = {
      tabCategory: [],
      tabPageLink: [],
      tabGroup: [],
      tabWindow: "currentWindow",
      pinnedTab: "noPinned",
      autoStart: "autoStartNo",
    }
  }

  componentWillMount() {
    // set defaults
    let tabWindow = "currentWindow";
    let pinnedTab = "noPinned";
    let autoStart = "autoStartNo"; 

    let categories = mw.retrieveCategories();
    if(categories === null ) {
      categories = [];
    }

    let settings = mw.getSettings();
//    console.log("cWM: settings", settings);
    if(settings !==null){
      tabWindow = settings.tabWindow;
      pinnedTab = settings.pinnedTab;
      autoStart = settings.autoStart;
    }
    this.setState(() => {
      return {
        tabCategory: categories,
        tabWindow: tabWindow,
        pinnedTab: pinnedTab,
        autoStart: autoStart
      };
    }, console.log("cWM - this.state: ", this.state));

//    let currentCategory = mw.retrieveOneCategoryByName("hello");
//    console.log("cWM - currentCategory: ", currentCategory);
//    console.log("cWM - CALLING getTabUrl - will return undefined: ", mw.getTabUrl(currentCategory));
//    console.log(mw.retrieveOneCategoryByName("hello"));
//    console.log(mw.retrieveOneCategoryByKey("p8rzv68e"));
    console.log("cWM - CALLING getAllOpenWindows - will return undefined: ", mw.getAllOpenWindows());
  }  

  /*** Categories ***/
  handleNewCategory = (value) => {
    let keyIDX = uniqueID();

    mw.createNewCategory(keyIDX, value);

    let categories = mw.retrieveCategories();
//    console.log(categories)
    this.setState(() => {
      return {
        tabCategory: categories,
      };
    }, console.log("state: ", this.state));
  }  

  deleteCategory = (categoryId, categoryName) => {
    mw.deleteCategory(categoryId, categoryName);
    let categories = mw.retrieveCategories();
//    console.log("this.deleteCategory: state ", this.state);
    this.setState(() => {
      return {
        tabCategory: categories,
      };
    }, console.log("this.deleteCategory: setState ", this.state));
  }

  /*** Tab Group ***/
  getTabGroup = (categoryName) => {
    console.log("in this.getTabGroup");
    let tabs = mw.getTabGroup(categoryName);
    console.log("this.getTabGroup -tabs: ", tabs);
    return tabs;
//    this.setState(() => {
//      return {
//        tabGroup: tabs, 
//      };
//    }, console.log("this.getTabGroup - state.tabs: ", this.state.tabGroup));
  }

  deleteTab = (tabId, tabName) => {
    mw.deleteTab(tabId, tabName);
    let tabs = mw.retrieveTabs();
    console.log("this.deleteTab: tabs", tabs);
    this.setState(() => {
      return {
        tabGroup: tabs,
      };
    }, console.log("this.deleteTab: setState ", this.state));
  }

  deleteTabGroup = (categoryName) => {
    mw.deleteTabGroup(categoryName);
    let tabs = mw.retrieveTabs();
    console.log("this.deleteTab: tabs", tabs);
    this.setState(() => {
      return {
        tabGroup: tabs,
      };
    }, console.log("this.deleteTab: setState ", this.state));
  }
  
  /*** Settings ***/
  updateTabWindow = (tabWindow) => {
//    console.log("in updateTabWindow", tabWindow);
    this.setState(() => {
      return {
        tabWindow: tabWindow, 
      };
    }, console.log(tabWindow, this.state.tabWindow));
  }

  updatePinnedTabs = (pinnedTab) => {
//    console.log("in updatePinnedTabs: ", pinnedTab);    
    this.setState(() => {
      return {
        pinnedTab: pinnedTab, 
      };
    }, console.log(pinnedTab, this.state.pinnedTab));
  }

  updateAutoStart = (autoStart) => {
//    console.log("in updateAutoStart");    
    this.setState(() => {
      return {
        autoStart: autoStart, 
      };
    }, console.log(autoStart, this.state.autoStart));
  }

  handleSettingsSubmit = (e) => {
    e.preventDefault();
    let tabWindow = this.state.tabWindow;
    let pinnedTab = this.state.pinnedTab;
    let autoStart = this.state.autoStart;
    mw.setSettings(tabWindow, pinnedTab, autoStart);
  }  

  render(){
    let tabCategory = this.props.newTabCategory;
    return(
      <div id="grid-container" className="grid-container">
        <Header />  
        <Categories
          newTabCategory={this.state.tabCategory}
          handleNewCategory={this.handleNewCategory}
          deleteCategory={this.deleteCategory}
        />

        <Route path="/" component={Welcome} exact={true} />
        <Route path="/about" component={About} exact={true} />

        <Route path="/category/:categoryName" 
          render={(props) => <TabGroup 
            {...props} 
            getTabGroup={this.getTabGroup}
            deleteTab={this.deleteTab}
            deleteTabGroup={this.deleteTabGroup}
          />}
        />
        <Footer />
      </div>
    );
  }
}

export default ChinguMasterTab;