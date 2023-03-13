import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import * as helper from './Helper';
import { getBlocks } from './Search';

import DragZone from './DragZone';
import Workspace from './Workspace';
import UserInput from './UserInput';
import Block from './Block';


// Build the main view controller
function MainView(properties) {

    // Define state variables via hooks
    // Shareable data
    const [search, updateSearch] = useState("");                                        // DragZone search bar
    const [dragZoneSelected, updateDragZoneSelected] = useState(null);
    const [blockZoneSelected, updateBlockZoneSelected] = useState(null);                                 
    const [input, updateInput] = useState("");                                          // DragZone/BlockZone current textarea input of block in focus
    const [file, updateFile] = useState(null);                                          // Current file to read from/write to
    const [blockValues, updateBlockValues] = useState(null);
    const [bzValues, updateBZValues] = useState([{type: UserInput, value: "Line 1"}, {type: Block, value: ["First", "x", "Third", "z"]}]);

    // The Workspace component holding the BlockZone and Editor
    const [workspace, updateWorkspace] = useState(
        <Workspace blockList={bzValues} updateBlockList={updateBZValues} updateInput={updateInput} updateMainIndex={updateBlockZoneSelected}/>
    );

    // When the BlockZone's blockList is updated, refresh the Workspace to show these changes
    useEffect(() => {
        updateWorkspace(<Workspace blockList={bzValues} updateBlockList={updateBZValues} updateInput={updateInput} updateMainIndex={updateBlockZoneSelected}/>);
    }, [bzValues]);

    // The DragZone component holding the search/filter bar and the corresponding list of blocks to choose from
    const [dragZone, updateDragZone] = useState(
        <DragZone 
        blockList={blockValues}
        updateSearch={updateSearch}
        updateBlockList={updateBlockValues}
        updateInput={updateInput}
        updateSelected={updateDragZoneSelected}
        />
    );

    // When a block from the dragZone is clicked, the dragZoneSelected is changed (side effect: also occurs on resetting dragZoneSelected to null)
    useEffect(() => {
        // If a block has been selected in the dragZone
        if (dragZoneSelected != null) {
            // Updated the currently focused index of the workspace with the selected dragZone block (if a line is in focus)
            if (blockZoneSelected != null) {
                updateBZValues(helper.replaceArrayIndex(bzValues, blockZoneSelected, {type: Block, value: dragZoneSelected}));
            }

            // Reset dragZoneSelected
            updateDragZoneSelected(null);
        }
    }, [dragZoneSelected]);

    // Update the dragzone depending on the current textarea input
    useEffect(() => {
        console.log("Updated input: ", input);

        // Update dragZone blockList using updated input
        if (input != "" && typeof(input) === 'string') {
            // Algorithm to get the blockList by using the input to filter SearchBlocks
            var searchBlocks = getBlocks(input);

            // If search bar is not null, use search bar value to further filter SearchBlocks
            // TODO

            // Update dragzone blocks
            updateBlockValues(searchBlocks);
        } else {
            updateBlockValues([]);
        }
    }, [input]);

    // When blockValues are updated, update DragZone
    useEffect(() => {
        console.log("New blockValues: ", blockValues);

        // Update dragzone
        updateDragZone(
            <DragZone
            blockList={blockValues}
            updateSearch={updateSearch}
            updateBlockList={updateBlockValues}
            updateInput={updateInput}
            updateSelected={updateDragZoneSelected}
            />
        );
    }, [blockValues])
    

    return (
        <div className={"row mh-100"} style={{height: '100%', overflow: 'hidden'}}>   
            <div className={"d-flex col-2 p-0 m-0"} style={{border: '2px solid red', height: '100%'}}>  
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