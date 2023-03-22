import Block from './Block';
import UserInput from './UserInput';

/*! @file Helper.jsx 
 *  @brief Helper.jsx: file containing helper functions.
 *
 *  Contains helper functions for various processes performed by the backend such as replacing elements at an array index,
 *  deleting elements from an array at a specified index, inserting an element into an array at an index, etc.
 */

/*! 
 *  @brief wasInserted function: determine whether a character was inserted into a string or not at a given index
 *
 *  The purpose of this method is to check a string before and after an operation was applied to the string.
 *  Suppose that str1 is the string before the operation and str2 is the string after the operation.
 *  Compares substrings of str1 and str2 to determine whether or not a character was inserted into the string or not.
 * 
 *  @param str1 Any string.
 *  @param str2 Supposedly str1, but after an insertion.
 *  @param index The index a character was supposedly inserted into.
 * 
 *  @return True or False
 */
export function wasInserted(str1, str2, index) {
    return (subString(str1, 0, index - 1) == subString(str2, 0, index - 1)) && (subString(str1, index + 1, str1.length - 1) == subString(str2, index, str2.length - 1));
}

/*! 
 *  @brief wasDeleted function: determine whether a character was deleted from a string or not at a given index
 *
 *  The purpose of this method is to check a string before and after an operation was applied to the string.
 *  Suppose that str1 is the string before the operation and str2 is the string after the operation.
 *  Compares substrings of str1 and str2 to determine whether or not a character was removed from the string or not.
 * 
 *  @param str1 Any string.
 *  @param str2 Supposedly str1, but after a character was deleted.
 *  @param index The index a character was supposedly deleted from.
 * 
 *  @return True or False
 */
export function wasDeleted(str1, str2, index) {
    return (subString(str1, 0, index - 1) == subString(str2, 0, index - 1)) && (subString(str1, index, str1.length - 1) == subString(str2, index + 1, str2.length - 1));
}

/*! 
 *  @brief arrayToString function: concatenate elements to form a single string
 *
 *  Iterate over each element in the string and concatenate the elements together to form a single string.
 * 
 *  @param array The array to convert to a string.
 * 
 *  @return The array after being converted to a string
 */
export function arrayToString(array) {
    var copy = "";
    for (var i = 0; i < array.length; i++) {
        copy += array[i];
    }
    return copy;
}

/*! 
 *  @brief subString function: return the list of characters in a string from indeces [start, end]
 *
 *  Return a substring of the given string from indeces [start, end].
 * 
 *  @param string The string to get a substring from.
 *  @param start The starting index of the substring.
 *  @param end The last index of the substring.
 * 
 *  @return The substring of string from indeces [start, end] or string if either start or end is invalid.
 */
export function subString(string, start, end) {
    if (start < 0) {
        console.log("Error: invalid starting index. Index is less than zero!");
        return string;
    }

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

/*! 
 *  @brief subArray function: get sub array of array from indeces [start, end]. 
 *
 *  For the given array, return a smaller array consisting of the elements from array[start] to array[end].
 *  Ex subArray([5, 9, 6, 7, 8], 0, 2) returns [5, 9, 6].
 * 
 *  @param array The array to return a subArray from.
 *  @param start The starting index to return a subArray from.
 *  @param end The last index to return a subArray from.
 * 
 *  @return A subArray of the array from [start, end].
 */
export function subArray(array, start, end) {
    if (start < 0) {
        console.log("Error: start is less than zero!");
        return array;
    }

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

/*! 
 *  @brief replaceArrayIndex function: replace a value in an array at the given index
 *
 *  Given an array, replace array[index] with the given value. Note that array[index] cannot be set to value since the array still points
 *  to the array that was passed to this function. A copy of the array is first created so that the original array is not altered.
 * 
 *  @param array The array whose index to replace with the given value.
 *  @param index The index of the array to replace.
 *  @param value The value to replace array[index] with.
 * 
 *  @return A copy of array where array[index] is replaced with the given value.
 */
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

/*! 
 *  @brief deleteArrayIndex function: return a copy of a given array without the specified index
 *
 *  Given an array, return a copy of the array where array[index] is removed from the array. Thus copy.length == array.length - 1.
 * 
 *  @param array The array whose index should be removed.
 *  @param index The index of the array to remove.
 * 
 *  @return A copy of array where array[index] no longer exists within the array and copy.length == array.length - 1.
 */
export function deleteArrayIndex(array, index) {
    var copy = [];
    var i = 0;

    // Copy indeces from [0, index)
    for (i; i < index; i++) {
        copy.push(array[i]);
    }

    // Move past index
    i++; 

    // Save remaining indeces from [index_i + 1, length - 1]
    for (i; i < array.length; i++) {
        copy.push(array[i]);
    }

    return copy;
}

/*! 
 *  @brief insertIntoArray function: insert a value into an array at the given index
 *
 *  Given an array and a value, insert the value into the array at the given index
 * 
 *  @param array The array to insert the value into.
 *  @param index The index of the array to have the value inserted into.
 *  @param value The value to insert into array[index].
 * 
 *  @return A copy of the array where array[index] now contains value. copy.length will now be equal to array.length + 1
 */
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

/*! 
 *  @brief insertNewLine function: insert a new line into the blockList.
 *
 *  The blockList should be provided to this function as the list parameter. A new line (a blank UserInput) should be inserted into the blockList
 *  at the specified index.
 * 
 *  @param list Can be any array, but should be the blockList.
 *  @param index The index of the array in which to insert the newline.
 * 
 *  @return Returns a copy of the given list (should be blockList) where a UserInput has been inserted into list[index]. 
 */
export function insertNewLine(list, index) {
    return insertIntoArray(list, index, {type: UserInput, value: ''});
}

/*! 
 *  @brief handleKeyDown function: a function to trigger when an onKeyDown event fires. Meant to be provided to Workspace UserInputs.
 *
 *  When onKeyDown fires, the handleKeyDown function ensures that the enter key cannot insert a carriage return in the text area like normal, 
 *  that the delete key does not delete a character, that the tab key does not refocus to the next focusable area, and that shift+tab does not 
 *  focus to the previous focusable area. Instead, the enter key inserts a new line into the Workspace, the delete key deletes a line from the Workspace,
 *  the tab key prepends a '\t' into the focused textarea, and shift+tab removes a prepended '\t' from the focused textarea if such a '\t' exists.
 * 
 *  @param event The event that was told to trigger this function.
 *  @param list Any array, but this array should be the blockList.
 *  @param index The current Workspace line in focus.
 *  @param updateBlockList The update function to update the blockList once a change is made to the blockList.
 * 
 *  @return None. Any changes made in the function will be handled by updateBlockList.
 */
export function handleKeyDown(event, list, index, updateBlockList) {
    // When enter is pressed, add a new line to the blockList
    if (event.key === 'Enter') {
        // Prevent default behavior for the enter key (normally creates a new line in textarea/input field)
        event.preventDefault();

        // Update the blockList using the return value of the following function
        updateBlockList(insertNewLine(list, index));

    } else if (list.length > 1 && event.key === 'Delete') { 
        // If the user hits "Delete", delete the index so long as the editor has more than 1 line
        event.preventDefault();                             // Prevent default delete behavior
        updateBlockList(deleteArrayIndex(list, index));     // Update the blockList

    } else if (event.key === 'Tab' && event.shiftKey) {
        // If the user hits "Shift+Tab", remove a tab from the current index of list only if there is a tab to remove
        event.preventDefault();

        // Depending on whether or not list[index].value is a string or an array
        if (typeof(list[index].value) === 'string') {
            // If it is a string, check if it starts with a '\t'
            if (list[index].value[0] == '\t') {
                // Remove the tab from the string by copying all indeces after index 0 into a copy string
                var copy = "";
                for (var i = 1; i < list[index].value.length; i++) {
                    copy += list[index].value[i];
                }

                // Update the blockList with this updated string
                updateBlockList(replaceArrayIndex(list, index, {value: copy, type: UserInput}));
            }
        } else {
            // If it is an array, check if its first string starts with a '\t'
            if (list[index].value[0][0] == '\t') {
                // Remove the tab from the string by copying all indeces after index 0 into a copy string
                var copy = "";
                for (var i = 1; i < list[index].value[0].length; i++) {
                    copy += list[index].value[0][i];
                }

                // Update the blockList with this updated string
                updateBlockList(replaceArrayIndex(list, index, {value: replaceArrayIndex(list[index].value, 0, copy), type: Block}));
            }
        }
    } else if (event.key === 'Tab') { 
        // If the user hits "Tab", prepend a tab to the current index of list.
        event.preventDefault();
        
        // Depending on whether or not list[index].value is a string or an array
        if (typeof(list[index].value) === 'string') {
            // If it is a string, append list[index].value to a string only containing a tab
            var tab = '\t' + list[index].value;
            updateBlockList(replaceArrayIndex(list, index, {value: tab, type: UserInput}));
        } else {
            // If it is an array, replace the first index of the array with a copy of the first index of the array, but with a tab prepended to it
            var tab = '\t' + list[index].value[0];
            updateBlockList(replaceArrayIndex(list, index, {value: replaceArrayIndex(list[index].value, 0, tab), type: Block}));
        }
    } 
}

/*! 
 *  @brief createBlockList function: create the BlockZone's blockList
 *
 *  Given the blockList from Main, create the BlockZone's blockList.
 * 
 *  @param list Any array, but this should be Main's bzValues.
 *  @param index The current Workspace line in focus.
 *  @param updateBlockList The update function for Main's bzValues
 *  @param updateValue The update function for the Workspace's value.
 *  @param updateIndex The update function for the Workspace's index (current line in focus).
 * 
 *  @return The BlockZone's blockList (an array of UserInputs and Blocks).
 */
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
                        updateIndex={updateIndex}
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

/*! 
 *  @brief createEditorLines function: create the lines of code that correspond to their respective Blocks/UserInputs
 * 
 *  @param list Any array, but this should be Main's bzValues.
 *  @param index The current Workspace line in focus.
 *  @param updateBlockList The update function for Main's bzValues.
 *  @param updateValue The update function for the Workspace's value.
 *  @param updateIndex The update function for the Workspace's index (current line in focus).
 * 
 *  @return The list of UserInputs representing the Editor.
 */
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
                        updateIndex={updateIndex}
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
                            // Something to put here in the meantime. View blockTranslationPseudo for pseudocode algorithm to implement
                            var a = 0;
                            a++;
                        }} 
                        updateIndex={updateIndex}
                        handleKeyDown={(event) => handleKeyDown(event, list, index, updateBlockList)}
                    />
                </div>
            );
        }
    }
    return editorLines;
}

/*! 
 *  @brief createDragZoneList function: create the list of blocks to display in the DragZone.
 * 
 *  @param list Any array, but should be the blockValues array from Main.
 *  @param updateIndex The update function to update the DragZone's current index in focus.
 * 
 *  @return The array of Blocks to display in the DragZone.
 */
export function createDragZoneList(list, updateIndex) {
    var array = [];

    // If there is no list, do not continue, return null
    if (list == null) {
        return null;
    } else { // Else, if there is a list, iterate through list and create a block using its values
        for (var i = 0; i < list.length; i++) {
            // Push a div (container) with a block inside of it
            array.push(
                <div key={"Dragzone Row: " + i} className={"row p-0 m-0"} style={{height: '30px', width: '100%', border: '1px solid black'}}>
                    <Block 
                        values={list[i]} 
                        index={i} 
                        updateValue={(event) => { return null }} 
                        updateIndex={updateIndex}
                        handleKeyDown={(event) => { return null }}
                    />
                </div>
            );
        }
    }

    return array;
}