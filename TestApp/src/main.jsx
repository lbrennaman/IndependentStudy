/// Imports React API along with useState and useEffect
import React, { useState, useEffect } from 'react';

/// Import ReactDOM API
import ReactDOM from 'react-dom/client';

/// Import all functions from helper
import * as helper from './Helper';

/// Import the getBlocks function from Search.jsx
import { getBlocks } from './Search';

/// Import the DragZone component from DragZone.jsx
import DragZone from './DragZone';

/// Import the Workspace component from Workspace.jsx
import Workspace from './Workspace';

/// Import the UserInput component from UserInput.jsx
import UserInput from './UserInput';

/// Import the Block component from Block.jsx
import Block from './Block';

/// Import the FileWriter component from FileWriter.jsx
import FileWriter from './FileWriter';

/*! @file main.jsx 
 *  @brief main.jsx: main file implementing React components
 *
 *  Creates the MainView component and attaches it to the DOM via a div with the id "MainViewController."
 */

/*! 
 *  @brief MainView Component: controls the entire interface
 *
 *  The MainView Component represents the entire interface as it holds all subcomponents along with the data that needs to be
 *  shared between those subcomponents.
 * 
 *  @param properties Properties that may be passed to this component upon instantiation. None used.
 * 
 *  @return A jsx object holding the Workspace, DragZone, and FileWriter components
 * 
 */
function MainView(properties) {

    // Define state variables via hooks

    // DragZone current search bar input
    const [search, updateSearch] = useState("");  

    /// dragZoneSelected: Current block selected in the DragZone
    const [dragZoneSelected, updateDragZoneSelected] = useState(null);                 
    
    // Current line selected in the BlockZone
    const [blockZoneSelected, updateBlockZoneSelected] = useState(null);  
    
    // DragZone/BlockZone current textarea input of block in focus
    const [input, updateInput] = useState("");  
    
    // Current list of blocks to display in the DragZone
    const [blockValues, updateBlockValues] = useState(null);  
    
    // Current list of blocks/lines to display in the BlockZone
    const [bzValues, updateBZValues] = useState([{type: UserInput, value: ""}]); 

    // The Workspace component holding the BlockZone and Editor
    const [workspace, updateWorkspace] = useState(
        <Workspace blockList={bzValues} updateBlockList={updateBZValues} updateInput={updateInput} updateMainIndex={updateBlockZoneSelected}/>
    );

    //The FileWriter controlling the file writing process
    const [f_writer, updateWriter] = useState(<FileWriter blockList={bzValues}/>);

    // When the BlockZone's blockList is updated, refresh the Workspace to show these changes
    useEffect(() => {
        updateWorkspace(<Workspace blockList={bzValues} updateBlockList={updateBZValues} updateInput={updateInput} updateMainIndex={updateBlockZoneSelected}/>);
        updateWriter(<FileWriter blockList={bzValues}/>);
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
        if (dragZoneSelected !== null) {
            // Updated the currently focused index of the workspace with the selected dragZone block (if a line is in focus)
            if (blockZoneSelected !== null) {
                updateBZValues(helper.replaceArrayIndex(bzValues, blockZoneSelected, {type: Block, value: dragZoneSelected}));
            }

            // Reset dragZoneSelected
            updateDragZoneSelected(null);
        }
    }, [dragZoneSelected]);

    // Update the dragzone depending on the current textarea input
    useEffect(() => {
        // Update dragZone blockList using updated input
        if (input != "" && typeof(input) === 'string') {
            // Algorithm to get the blockList by using the input to filter SearchBlocks
            let searchBlocks = getBlocks(input, search);

            // Update dragzone blocks
            updateBlockValues(searchBlocks);
        } else {
            updateBlockValues([]);
        }
    }, [input, search]);

    // When blockValues are updated, update DragZone
    useEffect(() => {
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
    }, [blockValues]);

    return (
        <div className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            <div className={"row mh-100 p-0 m-0"} style={{height: '30px', overflow: 'hidden'}}> 
                <div className={"d-flex col-2 p-0 m-0"}  style={{height: '100%', width: '17%'}}>  
                </div>
                <div className={"d-flex col-10 p-0 m-0"}  style={{height: '100%', width: '83%'}}>  
                    <div className={"row mh-100 p-0 m-0"} style={{height: '30px', width: '100%', overflow: 'hidden'}}> 
                        <div className={"d-flex col p-0 m-0"}  style={{height: '100%', width: '50%'}}>  
                        </div>
                        <div className={"d-flex col p-0 m-0"}  style={{height: '100%', width: '50%'}}>  
                            {/* Use a button and a UserInput to write to a file. User input provides file name, button writes to file.*/}
                            {f_writer}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row mh-100 p-0 m-0"} style={{height: '100%'}}>   
                <div className={"d-flex col-2 p-0 m-0"} style={{border: '2px solid red', height: '100%'}}>  
                    {dragZone}
                </div>
                {workspace}
            </div>
        </div>
    )
}


// Initialize all ReactDOM objects 
ReactDOM.createRoot(document.getElementById("MainViewController")).render(
    <React.StrictMode>
        <MainView/>
    </React.StrictMode>
);