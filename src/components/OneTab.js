import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Categories from './Categories';
import Footer from './Footer';
import TabGroup from './TabGroup';
import Settings from './Settings';
import Welcome from './Welcome';
import uniqueID from '../genID';

const Content = () => (
    <div className="div-hide">
        <Route exact={true} path="/" render={() => (
            <h1>Welcome</h1>
        )} />

    </div>
);

class OneTab extends Component {
    constructor(props) {
        super(props);

        this.handleNewCategory = this.handleNewCategory.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);
        this.updateTabWindow = this.updateTabWindow.bind(this);
        this.updatePinnedTabs = this.updatePinnedTabs.bind(this);
        this.updateAutoStart = this.updateAutoStart.bind(this);
        this.initWelcome = this.initWelcome.bind(this);
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
            tabWindowChecked:"",
            pinnedTabChecked: "",
            autoStartChecked: "",           
        }
    }

    updateTabWindow = (tabWindow) => {
        console.log("tabWindow: ", tabWindow);
        this.setState({tabWindow: tabWindow, tabWindowChecked: tabWindow}, () => console.log(tabWindow, this.state.tabWindowChecked));
    }

    updatePinnedTabs = (pinnedTab) => {
        console.log("updatePinnedTabs: ", pinnedTab);
        this.setState({pinnedTab: pinnedTab, pinnedTabChecked: pinnedTab}, () => console.log(pinnedTab, this.state.pinnedTabChecked));
    }

    updateAutoStart = (autoStart) => {
        console.log("updateAutoStart: ", autoStart);
        this.setState({autoStart: autoStart, autoStartChecked: autoStart}, () => console.log(autoStart, this.state.autoStartChecked));
    }

    handleSettingsSubmit = (e) => {
        e.preventDefault();
    }        

    handleNewCategory = (value) => {
        let keyIDX = uniqueID();
        console.log("keyIDX: ", keyIDX);

        // once a Category is created, don't show the Welcome component again
        this.setState((prevState) => {
           return {
              tabCategory: prevState.tabCategory.concat({categoryName: value, key : keyIDX}),
              name: '',
              showWelcome: false
           };
        });

     }  
     
     handleNameChange = (e) => {
        e.preventDefault();
        var value=e.target.value;
        this.setState({
           name: value,
           value: value,
        });
     }

    initWelcome = () => {
        console.log("Now we init state.showWelcome to false...", this.state.showWelcome);
        this.setState({showWelcome: false}, console.log(this.state.showWelcome));
    }

    render() {
        return (
            <div id="grid-container" className="grid-container">
                <Header />
                <Categories
                    handleNewCategory={this.handleNewCategory}
                    handleNameChange={this.handleNameChange}
                    newTabCategory={this.state.tabCategory}
                    keyIDX={this.state.keyIDX}
                    name={this.state.name}
                />
                { this.state.showWelcome && <Welcome />}
                <Route path="/category/:categoryName" component={TabGroup} />
                <Route path="/settings/" 
                    render={(props) => <Settings 
                        {...props} 
                        handleSettingsSubmit={this.handleSettingsSubmit} 

                        updateTabWindow={this.updateTabWindow}
                        tabWindow={this.state.tabWindow}
                        tabWindowChecked={this.state.tabWindowChecked}

                        updatePinnedTabs={this.updatePinnedTabs}
                        pinnedTab={this.state.pinnedTab}
                        pinnedTabChecked={this.state.pinnedTabChecked}

                        updateAutoStart={this.updateAutoStart}
                        autoStart={this.state.autoStart}
                        autoStartChecked={this.state.autoStartChecked}
                    />}
                />
                <Footer />
            </div>
        );
    }
}

export default OneTab;