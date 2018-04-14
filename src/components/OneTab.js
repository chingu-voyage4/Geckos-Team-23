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
import * as ls from '../fromRepl';

class OneTab extends Component {
  constructor(props) {
    super(props);

      this.handleNewCategory = this.handleNewCategory.bind(this);
      this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);
      this.updateTabWindow = this.updateTabWindow.bind(this);
      this.updatePinnedTabs = this.updatePinnedTabs.bind(this);
      this.updateAutoStart = this.updateAutoStart.bind(this);
      this.getCategoryList = this.getCategoryList.bind(this);
      this.deleteCategory = this.deleteCategory.bind(this);

      this.state = {
        name: '',
        tabCategory: [],
        tabPageLink: [
          {
            tabKey: 1,
            categoryKey: 1,
            tabName: "React Tutorial",
            tabURL: "https://www.somedomain.com"
          },
          {
            tabKey: 2,
            categoryKey: 2,
            tabName: "JavaScript Tutorial",
            tabURL: "https://www.somedomain.com"
          }
        ],
          showWelcome: true,
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

    let categories = this.getCategoryList();
    if(categories === null ) {
      categories = [];
    }

    let settings = ls.getSettings();
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
        autoStart: autoStart,
        name: ''
      };
    }, console.log("cWM - this.state: ", this.state));
  }

  updateTabWindow = (tabWindow) => {
    this.setState({tabWindow: tabWindow, tabWindowChecked: tabWindow}, () => console.log(tabWindow, this.state.tabWindowChecked));
  }

  updatePinnedTabs = (pinnedTab) => {
    this.setState({pinnedTab: pinnedTab, pinnedTabChecked: pinnedTab}, () => console.log(pinnedTab, this.state.pinnedTabChecked));
  }

  updateAutoStart = (autoStart) => {
    this.setState({autoStart: autoStart, autoStartChecked: autoStart}, () => console.log(autoStart, this.state.autoStartChecked));
  }

  handleSettingsSubmit = (e) => {
    e.preventDefault();
    let tabWindow = this.state.tabWindow;
    let pinnedTab = this.state.pinnedTab;
    let autoStart = this.state.autoStart;
    ls.setSettings(tabWindow, pinnedTab, autoStart);
  }        

  handleNewCategory = (value) => {
    let keyIDX = uniqueID();
    ls.addCategory(keyIDX, value);
    // once a Category is created, don't show the Welcome component again
    let categories = this.getCategoryList();
    this.setState(() => {
      return {
        tabCategory: categories,
        showWelcome: false
      };
    }, console.log(this.state));
  }  
  
  getCategoryList = () => {
    let categories = [];
    let list = ls.getCategories();
    if(!list){
      return categories;
    };

    categories = list.map((catItem) => { 
      let rObj = {};
      rObj.categoryKey = catItem.id;
      rObj.categoryName = catItem.name;
      return rObj;
    })
    return categories;
  }

  deleteCategory = (categoryId, categoryName) => {
      ls.deleteCategory(categoryId, categoryName);
      let categories = this.getCategoryList();
      this.setState(() => {
        return {
          tabCategory: categories,
        };
      });
  }

  render() {
    return (
      <div id="grid-container" className="grid-container">
          <Header />
          <Categories
          handleNewCategory={this.handleNewCategory}
          newTabCategory={this.state.tabCategory}
          deleteCategory={this.deleteCategory}
          keyIDX={this.state.keyIDX}
          name={this.state.name}
          />

          <Route path="/" component={Welcome} exact={true} />
          <Route path="/about" component={About} exact={true} />
          <Route path="/category/:categoryName" component={TabGroup} />
          
          <Route path="/settings/" 
          render={(props) => <Settings 
          {...props} 
          handleSettingsSubmit={this.handleSettingsSubmit} 

          updateTabWindow={this.updateTabWindow}
          tabWindow={this.state.tabWindow}

          updatePinnedTabs={this.updatePinnedTabs}
          pinnedTab={this.state.pinnedTab}

          updateAutoStart={this.updateAutoStart}
          autoStart={this.state.autoStart}
          />}
          />
          <Footer />
      </div>
    );
  }
}

export default OneTab;