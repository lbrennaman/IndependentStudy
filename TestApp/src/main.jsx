import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import DragZoneBlock from './DragZoneBlock';
import DragZone from './DragZone';
import Workspace from './Workspace';

// Build the main view controller
function MainView(properties) {

    // Define state variables via hooks
    // Shareable data
    const [search, updateSearch] = useState("");                                        // DragZone search bar
    const [dragZoneSelected, updateDragZoneSelected] = useState(null);
    const [blockZoneSelected, updateBlockZoneSelected] = useState(null);                                  
    const [input, updateInput] = useState("");                                          // DragZone/BlockZone current textarea input of block in focus
    const [file, updateFile] = useState(null);                                          // Current file to read from/write to
    const [blockList, updateBlockList] = useState([<DragZoneBlock blockNumber={0} values={["Set", "text"]} updateSelected={updateDragZoneSelected}/>]);
    const [workspace, updateWorkspace] = useState(<Workspace updateSelected={updateBlockZoneSelected} updateInput={updateInput}/>);

    // Subcomponent controllers
    const [dragZone, updateDragZone] = useState(
        <DragZone 
        blockList={blockList}
        updateSearch={updateSearch}
        updateBlockList={updateBlockList}
        updateInput={updateInput}
        />
    );


    useEffect(() => {
        console.log("UPDATE SELECTED/INPUT");
        console.log("BlockZone Selected: ", blockZoneSelected);
        console.log("DragZone Selected: ", dragZoneSelected)
        console.log("Input: ", input);

        updateDragZone(
            <DragZone
            blockList={blockList}
            updateSearch={updateSearch}
            updateBlockList={updateBlockList}
            updateInput={updateInput}
            />
        );
    }, [blockZoneSelected, dragZoneSelected, input]);

    return (
        <div className={"row mh-100"} style={{height: '100%'}}>                                                     {/* Main Col Splitter */}
            <div className={"d-flex col-2 p-0 m-0"} style={{border: '2px solid red', height: '100%'}}>              {/* DragZone Column */}
                {dragZone}
            </div>
            {workspace}
        </div>
    )
}

// #######################################################################################
// 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
// #######################################################################################

// # 1: Initialize all ReactDOM objects #
// const mainViewController = new MainViewController(); <-- should not need this class, but in the future, might be needed to control MainView controllers

ReactDOM.createRoot(document.getElementById("MainViewController")).render(
    <React.StrictMode>
        <MainView/>
    </React.StrictMode>
);

// #######################################################################################
// 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
// #######################################################################################

// # 2: List all function definitions #

// #######################################################################################
// 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
// #######################################################################################

// # 3: Define any action listeners for document #

// #######################################################################################
// 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
// #######################################################################################

// # 4: Actual Main: list all sequential statements here #