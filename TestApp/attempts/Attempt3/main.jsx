import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import DragZoneController from './DragZone';
import BlockZoneController from './BlockZone';
import EditorController from './Editor';

import BlockController from './Block';
import BlockTableController from './BlockTable';

// Build the main view controller
function MainView(properties) {

    // Define state variables via hooks
    // Shareable data
    const [search, updateSearch] = useState("");                                        // DragZone search bar
    const [blockList, updateBlockList] = useState([new BlockController()]);             // DragZone blockList
    const [selected, updateSelected] = useState(null);                                  // DragZone/BlockZone block in focus
    const [input, updateInput] = useState("");                                          // DragZone/BlockZone current textarea input of block in focus
    const [file, updateFile] = useState(null);                                          // Current file to read from/write to

    // Subcomponent controllers
    const [dragZoneController, updateDragZoneController] = useState(new DragZoneController({
        updateSearch: updateSearch, 
        updateBlockList: updateBlockList,
        updateSelected: updateSelected,
        updateInput: updateInput,
        blockList: blockList
    }));

    const [blockZoneController, updateBlockZoneController] = useState(new BlockZoneController({
        updateSelected: updateSelected,
        updateInput: updateInput,
        updateBlockTable: updateBlockTable,
        blockTable: blockTable
    }));

    const [editorController, updateEditorController] = useState(new EditorController({
        updateBlockTable: updateBlockTable,
        editorLines: blockTable.getEditorLinesComponent()
    }));

    return (
        <div className={"row mh-100"} style={{height: '100%'}}>                                                     {/* Main Col Splitter */}
            <div className={"d-flex col-2 p-0 m-0"} style={{border: '2px solid red', height: '100%'}}>              {/* DragZone Column */}
                {dragZoneController.getComponent()}
            </div>
            {workspaceController.getComponent()}
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