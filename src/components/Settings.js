import React, { Component } from 'react';
import { render } from "react-dom";

class Settings extends Component {
    constructor() {
        super();
        this.updateTabWindow = this.updateTabWindow.bind(this);
        this.updatePinnedTabs = this.updatePinnedTabs.bind(this);
        this.updateAutoStart = this.updateAutoStart.bind(this);
        this.updateWarnDuplicate = this.updateWarnDuplicate.bind(this);
    }
    updateTabWindow = (e) => {
        if (e.target.checked) {
            this.props.updateTabWindow(e.target.value)
        }
    }

    updatePinnedTabs = (e) => {
        if (e.target.checked) {
            this.props.updatePinnedTabs(e.target.value)
        }
    }

    updateAutoStart = (e) => {
        if (e.target.checked) {
            this.props.updateAutoStart(e.target.value)
        }
    }

    updateWarnDuplicate = (e) => {
        if (e.target.checked) {
            this.props.updateWarnDuplicate(e.target.value)
        }
    }
    render() {
        console.log("before render: ", this.props.warnDuplicate, this.props.warnDuplicateChecked);
        return (
            <div id="settings" className="main ul-no-bullet">
                <div id="openTabWindow">
                    <form id="openTabWindow">
                        <h4>When opening tab(s), do so in: </h4>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="windowOptions"
                                    value='currentWindow'
                                    checked={this.props.tabWindow === "currentWindow"}
                                    onChange={this.updateTabWindow} /> Current Window
                        </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="windowOptions"
                                    value='newWindow'
                                    checked={this.props.tabWindow === "newWindow"}
                                    onChange={this.updateTabWindow} /> New Window
                        </label>
                        </div>
                    </form>
                </div>

                <div id="pinnedTabs">
                    <form id="pinnedTabs">
                        <h4>Pinned tabs are: </h4>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="pinnedOptions"
                                    value='noPinned'
                                    checked={this.props.pinnedTab === "noPinned"}
                                    onChange={this.updatePinnedTabs} /> Not saved
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="pinnedOptions"
                                    value='yesPinned'
                                    checked={this.props.pinnedTab === "yesPinned"}
                                    onChange={this.updatePinnedTabs} /> Will be saved
                            </label>
                        </div>
                    </form>
                </div>

                <div id="autoStartup">
                    <form id="autoStartup">
                        <h4>Start OneTab++: </h4>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="pinnedOptions"
                                    value='autoStartNo'
                                    checked={this.props.autoStart === "autoStartNo"}
                                    onChange={this.updateAutoStart} /> I will start it myself
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="autoOptions"
                                    value='autoStart'
                                    checked={this.props.autoStart === "autoStart"}
                                    onChange={this.updateAutoStart} /> Start it when I open my browser
                            </label>
                        </div>
                    </form>
                </div>

                <div id="warnDuplicate">
                    <form id="warnDuplicate">
                        <h4>OneTab will not save duplicate tab links within a category:</h4>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="warnDuplicateOptions"
                                    value='noWarn'
                                    checked={this.props.warnDuplicate === "noWarn"}
                                    onChange={this.updateWarnDuplicate} /> OK. I'll let you handle it.
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="warnDuplicateOptions"
                                    value='yesWarn'
                                    checked={this.props.warnDuplicate === "yesWarn"}
                                    onChange={this.updateWarnDuplicate} /> Please tell me if I have a duplicate tab
                            </label>
                        </div>
                        <div>
                            <button onClick={this.props.handleSettingsSubmit}>Save</button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}
export default Settings;


