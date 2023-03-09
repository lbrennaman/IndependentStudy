import Block from './Block';
import UserInput from './UserInput';

// wasInserted function: determine whether a character was inserted into a string or not at a given index
export function wasInserted(str1, str2, index) {
    return (subString(str1, 0, index - 1) == subString(str2, 0, index - 1)) && (subString(str1, index + 1, str1.length - 1) == subString(str2, index, str2.length - 1));
}

// wasDeleted function: determine whether a character was deleted into a string or not at a given index
export function wasDeleted(str1, str2, index) {
    return (subString(str1, 0, index - 1) == subString(str2, 0, index - 1)) && (subString(str1, index, str1.length - 1) == subString(str2, index + 1, str2.length - 1));
}

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
                            // Value will be equal to stringRepresentation with a character removed/inserted into a random index
                            // ---------------------------------------------------------------------------------------------------------------------------------------
                            // Method 1:
                            // ---------------------------------------------------------------------------------------------------------------------------------------
                            //
                            // Iterate through both the stringRepresentation and value at the same time
                            // The value[current] that differs from stringRepresentation[current] is the index that has been altered
                            //      Insert Ex. 
                            //                  stringRep = abcdef
                            //                  value =     abckdef
                            //      Delete Ex.
                            //                  stringRep = abcdef
                            //                  value =     abdef
                            //      Replace Ex.
                            //                  stringRep = abcdef
                            //                  value =     abvdef
                            //
                            // A character was inserted into value[current] if 
                            // --> subString(value, 0, current - 1) == subString(stringRep, 0, current - 1) &&
                            // --> subString(value, current + 1, length - 1) == subString(stringRep, current, length - 1)
                            // A character was deleted from value[current] if
                            // --> subString(value, 0, current - 1) == subString(stringRep, 0, current - 1) &&
                            // --> subString(value, current, length - 1) == subString(stringRep, current + 1, length - 1)
                            // A character was replaced from value[current] if the other two conditions are false
                            //
                            // If it needs to be known whether the value is an insertion or deletion before iteration,
                            // --> A character was inserted if value.length > stringRep.length
                            // --> A character was deleted if value.length < stringRep.length
                            // --> A character was replaced if value.length == stringRep.length
                            //
                            // To update list[index].value properly, the change in the current index must be properly reflected into its corresponding array
                            // For an array of length 3, it has indeces [0, ..., n - 1], [n, ..., n + (m - 1)], [n + m, ..., n + m + (o - 1)]
                            // If the current index is between n and n + (m - 1), then array[1] should be updated with subString(value, array[1] start, array[2] start - 1)
                            //
                            // Problem found: if a character is inserted between two strings, which string appends the character?
                            // The inserted character should only affect array odd indeces, so if a character is inserted in between an odd and even index, 
                            // the odd should index should be the one updated. 
                            //
                            // ---------------------------------------------------------------------------------------------------------------------------------------
                            // Method 2: 
                            // ---------------------------------------------------------------------------------------------------------------------------------------
                            //
                            // There are n strings in list[index].value, each of varying length
                            // String n remains the same if string == subString(value, start, start + offset),
                            // --> when start == total combined length of previous strings - (1 * number of previous strings) and offset = length of current string - 1
                            // Otherwise, the current string differs from the subString of value, meaning that the current string has been altered
                            // Note that all substrings after the affected index will not match their corresponding string
                            // In that case, updateValue(replaceArrayIndex(list[index].value, index of string, corresponding substring of value))
                            //
                            // ---------------------------------------------------------------------------------------------------------------------------------------

                            // Method 1
                            var found = false;
                            var array = list[index].value;
                            for (var current = 0; current < value.length; current++) {
                                // The value[current] that differs from stringRepresentation[current] is the index that has been altered
                                if (value[current] != stringRepresentation[current] && !found) {
                                    // Check conditions for insertion/deletion/replacement
                                    if (wasInserted(value, stringRepresentation, current)) {
                                        console.log("INSERTION");
                                    } else if (wasDeleted(value, stringRepresentation, current)) {
                                        console.log("DELETION");
                                    } else {
                                        console.log("REPLACEMENT");
                                    }

                                    found = true;
                                }
                            }

                            // Method 2
                            /*
                            var array = list[index].value;
                            var count = 0;
                            var start = 0;
                            var offset = 0;
                            array.forEach((string) => {
                                if (string) {
                                    if (string != subString(value, start, start + offset)) {
                                        updateValue(replaceArrayIndex(array, count, value));
                                    }
                                } else {
                                    // In the case of which list[index].value has a null index, whether or not this string is altered depends on the next string
                                }

                                // Finally, increment string count
                                count++;
                            });
                            */
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