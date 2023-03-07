import { useState, useEffect } from 'react';

import Block from './Block';
import UserInput from './UserInput';

import BlockZone from './BlockZone';
import Editor from './Editor';

export function Workspace(properties) {
    const [value, updateValue] = useState("");
    const [index, updateIndex] = useState(0);
    const [index_j, updateIndex_j] = useState(null);

    // Parameters can be cleaned by using JSON: settings = {list: properties.blockList, index: index, updateBlockList: properties...}, pass settings to functions
    const blockList = createBlockList(properties.blockList, index, properties.updateBlockList, updateValue, {i: updateIndex, j: updateIndex_j});
    const editorLines = createEditorLines(properties.blockList, index, properties.updateBlockList, updateValue, {i: updateIndex, j: updateIndex_j});

    useEffect(() => {
        console.log("Update Index i: ", index);
    }, [index]);

    useEffect(() => {
        properties.updateBlockList(() => {
            var array = [];
            var i = 0;

            // Save indeces from [0, index), if index == 0, skip to updating index
            for (i; i < index; i++) {
                array.push(properties.blockList[i]);
            }

            // Update index with current value being typed, ensure type of block remains the same: update array[index]
            array.push({type: properties.blockList[index].type, value: value});
            i++; // Updated index, move to index + 1

            // Save indeces from [index + 1, end of array]
            for (i; i < properties.blockList.length; i++) {
                array.push(properties.blockList[i]);
            }

            return array;
        })
    }, [value]);

    return(
        <div id={"Workspace"} className={"d-flex col-10 p-0 m-0"} style={{height: '100%'}}>
            <div id={"Workspace Splitter"} className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                <div id={"BlockZone Container"} className={"d-flex col-6 p-0 m-0"} style={{height: '100%'}}>
                    <BlockZone>
                        {blockList}
                    </BlockZone>
                </div>
                <div id={"Editor Container"} className={"d-flex col-6 p-0 m-0"} style={{height: '100%'}}>
                    <Editor>
                        {editorLines}
                    </Editor>
                </div>
            </div>
        </div>
    );
}

// insertNewLine function
// ------------------------------------------------------------------------------------------------------------------
// list: properties.blockList; the blockList as stored in the parent component (Main)
// index: the current index that is selected, as stored by this component
function insertNewLine(list, index) {
    var array = [];
    var i = 0;

    // Copy lines from [0, index] back into the array
    for (i; i < index + 1; i++) {
        array.push(list[i]);
    }

    // Push a new line into the index directly after the current index (array[index + 1].insert(new line))
    array.push({type: UserInput, value: "NewLine"});

    // Copy the remaining lines [index + 1, length - 1] back into the array
    for (i; i < list.length; i++) {
        array.push(list[i]);
    }

    return array;
}

// handleKeyDown function
// ------------------------------------------------------------------------------------------------------------------
// event: the event that triggered this function (meant to be onKeyDown)
// list: properties.blockList; the blockList as stored in the parent component (Main)
// index: the current index that is selected, as stored by this component
// updateBlockList: the update function to update the blockList stored in the parent component
function handleKeyDown(event, list, index, updateBlockList) {
    // When enter is pressed, add a new line to the blockList
    if (event.key === 'Enter') {
        // Prevent default behavior for the enter key (normally creates a new line in textarea/input field)
        event.preventDefault();

        // Update the blockList using the return value of the following function
        updateBlockList(insertNewLine(list, index));
    }
}

// createBlockList function
// ------------------------------------------------------------------------------------------------------------------
// list: properties.blockList; the blockList as stored in the parent component (Main)
// index: the current index that is selected, as stored by this component
// updateBlockList: the update function to update the blockList stored in the parent component
// updateValue: the update function to update the current value being modified in this component
// updateIndex: the update function to update the current index that is selected, as stored by this component
function createBlockList(list, index, updateBlockList, updateValue, updateIndex) {
    var blockList = [];

    // Iterate through the blockList data and add the appropriate component to the list of blocks to display in the BlockZone
    for (var i = 0; i < list.length; i++) {
        // If a block has not been placed in this line of the BlockZone, the line is still a UserInput (which may have a value)
        if (list[i].type == UserInput) {
            blockList.push(
                <div key={"BlockZone Row: " + i} className={"row p-0 m-0"} style={{height: '30px', width: '100%', border: '1px solid black'}}>
                    <UserInput 
                        value={list[i].value} 
                        index={i} 
                        updateValue={updateValue} 
                        updateIndex={updateIndex.i}
                        handleKeyDown={(event) => handleKeyDown(event, list, index, updateBlockList)}
                    />
                </div>
            );
        } else { // Otherwise, it is some type of block. Push a block with the given array of values
            // Add blocks
            blockList.push(
                <div key={"BlockZone Row: " + i} className={"row p-0 m-0"} style={{height: '30px', width: '100%', border: '1px solid black'}}>
                    <Block 
                        values={list[i].value} 
                        index={i} 
                        updateValue={updateValue} 
                        updateIndex={updateIndex}
                        handleKeyDown={(event) => handleKeyDown(event, list, index, updateBlockList)}
                    />
                </div>
            );
        }
    }
    return blockList;
}

// createEditorLines function
// ----------------------------------------------------------------------------------------------------------------
// list: properties.blockList; the blockList as stored in the parent component (Main)
// index: the current index that is selected, as stored by this component
// updateBlockList: the update function to update the blockList stored in the parent component
// updateValue: the update function to update the current value being modified in this component
// updateIndex: the update function to update the current index that is selected, as stored by this component
function createEditorLines(list, index, updateBlockList, updateValue, updateIndex) {
    var editorLines = [];

    // Iterate through the blockList data and write the proper string data to the corresponding line of the text editor
    for (var i = 0; i < list.length; i++) {
        // If the type of data is a UserInput component, the data is already a string, so add it to the editor
        if (list[i].type == UserInput) {
            editorLines.push(
                <div key={"Editor Line: " + i} className={"row p-0 m-0"} style={{height: '30px', width: '100%', border: '1px solid black'}}>
                    <UserInput 
                        value={list[i].value} 
                        index={i} 
                        updateValue={updateValue} 
                        updateIndex={updateIndex.i}
                        handleKeyDown={(event) => handleKeyDown(event, list, index, updateBlockList)}
                    />
                </div>
            );
        } else {
            // The type of data is a Block, so take list[i].value and concatenate the array into their string representation
            var stringRepresentation = "";
            for (var j = 0; j < list[i].value.length; j++) {
                stringRepresentation += list[i].value[j];
            }
            editorLines.push(
                <div key={"Editor Line: " + i} className={"row p-0 m-0"} style={{height: '30px', width: '100%', border: '1px solid black'}}>
                    <UserInput 
                        value={stringRepresentation} 
                        index={i} 
                        updateValue={(value) => {
                            console.log("Editor line block's updateValue fired!"); 
                            
                            // Cannot updateValue like normal since a block's value is an array. UserInput stores a single string, so attempting to updateValue
                            // will override the array with a string.

                            // Options: 
                            // 1) do not provide the capability to create blocks from code
                            // 2) find a way to keep list[i].value an array and update list[i].value[j]
                        }} 
                        updateIndex={updateIndex.i}
                        handleKeyDown={(event) => handleKeyDown(event, list, index, updateBlockList)}
                    />
                </div>
            );
        }
    }
    return editorLines;
}

export default Workspace;