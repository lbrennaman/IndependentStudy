import Block from './Block';
import UserInput from './UserInput';

// arrayToString function: concatenate elements to form a single string
export function arrayToString(array) {
    var copy = "";
    for (var i = 0; i < array.length; i++) {
        copy += array[i];
    }
    return copy;
}

// subString function: return the list of characters in a string from indeces [start, end].
export function subString(string, start, end) {
    if (end > string.length - 1) {
        console.log("Error: substring end is too big of an index for this string! Returning string...");
        return string;
    }

    var copy = "";
    for (var i = start; i <= end; i++) {
        copy += string[i];
    }
    return copy;
}

// subArray function: get sub array of array from indeces [start, end]. Ex subArray([5, 9, 6, 7, 8], 0, 2) returns [5, 9, 6]
export function subArray(array, start, end) {
    if (end > array.length - 1) {
        console.log("Error: subarray end is out of bounds! Returning array...");
        return array;
    }

    var copy = [];
    for (var i = start; i <= end; i++) {
        copy.push(array[i]);
    }
    return copy;
}

// replaceArrayIndex function: replace a value in an array at the given index
export function replaceArrayIndex(array, index, value) {
    var copy = [];
    var i = 0;

    // Copy indeces from [0, index), if index_i == 0, skip to updating index
    for (i; i < index; i++) {
        copy.push(array[i]);
    }

    // Update index with current value, ensuring to increment i to move to next index
    copy.push(value);
    i++; 

    // Save indeces from [index_i + 1, length - 1]
    for (i; i < array.length; i++) {
        copy.push(array[i]);
    }

    return copy;
}

// insertIntoArray function: insert a value into an array at the given index
// ------------------------------------------------------------------------------------------------------------------
// array: the array of items to insert the given value into
// index: the index of the array to insert the value into
// value: the value to insert into the array
export function insertIntoArray(array, index, value) {
    var copy = [];
    var i = 0;

    // Copy lines from [0, index - 1] back into the array
    for (i; i < index + 1; i++) {
        copy.push(array[i]);
    }

    // Insert the new value at the index
    copy.push(value);

    // Copy the remaining indeces back into the array (indeces: [index, length - 1] 
    for (i; i < array.length; i++) {
        copy.push(array[i]);
    }

    return copy;
}

// insertNewLine function
// ------------------------------------------------------------------------------------------------------------------
// list: properties.blockList; the blockList as stored in the parent component (Main)
// index: the current index that is selected, as stored by this component
export function insertNewLine(list, index) {
    return insertIntoArray(list, index, {type: UserInput, value: "NewLine"});
}

// handleKeyDown function
// ------------------------------------------------------------------------------------------------------------------
// event: the event that triggered this function (meant to be onKeyDown)
// list: properties.blockList; the blockList as stored in the parent component (Main)
// index: the current index that is selected, as stored by this component
// updateBlockList: the update function to update the blockList stored in the parent component
export function handleKeyDown(event, list, index, updateBlockList) {
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
export function createBlockList(list, index, updateBlockList, updateValue, updateIndex) {
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
export function createEditorLines(list, index, updateBlockList, updateValue, updateIndex) {
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
            var stringRepresentation = arrayToString(list[i].value);
            editorLines.push(
                <div key={"Editor Line: " + i} className={"row p-0 m-0"} style={{height: '30px', width: '100%', border: '1px solid black'}}>
                    <UserInput 
                        value={stringRepresentation} 
                        index={i} 
                        updateValue={(value) => {
                            console.log("Editor line block's updateValue fired! The retrieved value: ", value); 
                            
                            // Cannot updateValue like normal since a block's value is an array. UserInput stores a single string, so attempting to updateValue
                            // will override the array with a string.

                            // Options: 
                            // 1) do not provide the capability to create blocks from code
                            // 2) find a way to keep list[i].value an array and update list[i].value[j]

                            // An algorithm that updates the proper list[i].value[j] must accomplish the following:
                            // 1) The algorithm must not allow any indeces besides i and j to be altered
                            // 2) Must be able to map indeces {[x, y]1, [x, y]2, ..., [x, y]n} -> {j1, j2, ..., jn}

                            // Algorithm:
                            // Loop through each character in value and copy each character into a new string while looping through j indeces using a counter k
                            // If copy matches list[index].value[k][l], increment k
                            // If copy does not match list[index].value[k][l], set list[index].value[k] to value

                            //updateValue(replaceArrayIndex(list[index].value, index, value));
                            var copyString = "";
                            var copyArray = [];

                            // split value into an array and see if it equals list[index].value
                            var val_i = 0;
                            for (var k = 0; k < list[index].value.length; k++) {
                                if (list[index].value[k]) {
                                    console.log("For ", list[index].value[k], " k = ", k, ": ", list[index].value[k], " exists.");
                                    for (var l = 0; l < list[index].value[k].length; l++) {
                                        if (list[index].value[k][l] == value[val_i]) {
                                            console.log("For ", list[index].value[k], " k = ", k, " l = ", l, ": ", list[index].value[k][l], " == ", value[val_i]);
                                            copyString += value[val_i];
                                            val_i++;
                                        }
                                    }

                                    if (copyString == list[index].value[k]) {
                                        console.log("Made it through successfully. ", copyString, " == ", list[index].value[k]);
                                        if (k == list[index].value.length - 1) {
                                            if (value[val_i]) {
                                                copyString += value[val_i];
                                            }
                                        }
                                        copyArray.push(copyString);
                                        copyString = "";
                                    } else {
                                        console.log("Somehow unsuccessful: ", copyString);
                                    }
                                } else {
                                    console.log("For ", list[index].value[k], " k = ", k, ": ", list[index].value[k], " does not exist. Do nothing.");
                                    if (list[index].value[k + 1]) {
                                        if (list[index].value[k + 1][0] != value[val_i]) {
                                            copyArray.push(value[val_i]);
                                            copyString = "";
                                            val_i++;
                                        } else {
                                            copyArray.push("");
                                            copyString = "";
                                        }
                                    } else {
                                        if (value[val_i]) {
                                            copyArray.push(value[val_i]);
                                            copyString = "";
                                            val_i++;
                                        } else {
                                            copyArray.push("");
                                            copyString = "";
                                        }
                                    }
                                }
                            }

                            updateValue(copyArray);
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