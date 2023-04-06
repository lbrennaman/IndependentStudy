/// Import the useState hook from React
import { useState } from 'react';

/// Import the UserInput component from UserInput.jsx
import UserInput from './UserInput';

/*! @file FileWriter.jsx 
 *  @brief FileWriter.jsx: file containing the FileWriter component.
 *
 *  Contains the component that handles writing the contents of the editor lines to a file.
 */

/*! @brief formatStringAsJSON: take in a string and return it with JSON formatting
 *
 *  @param string: the string to format as JSON
 * 
 *  @return The string, except formatted as it would be in a .json file
 */
function formatStringAsJSON(string) {
    // Add newlines and tabs to the string to make it look good when written to a file
    let copy = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i] == ",") {                 // Ensure that there are newlines at the end of objects
            if (i - 1 >= 0) {
                if (string[i - 1] == "}") {
                    copy += ",\n";
                } else {
                    copy += string[i];
                }
            } 
        } else if (string[i] == "]") {          // Ensure that the final "]" has a new line before it
            if (i + 1 >= string.length) {
                copy += "\n]";
            } else {
                copy += string[i];
            }
        } else if (string[i] == '{') {          // Ensure that the beginning of each object is indented
            if (i + 6 < string.length) {
                if (string.slice(i + 1, i + 7) == "\"type\"") { // This helps to know if it is the beginning of the object or not
                    copy += "\t{";
                } else {
                    copy += "{";
                }
            } else {
                copy += "{";
            }
        } else if (i == 0) {                    // Ensure that the first "[" has a new line after it
            copy += "[\n";
        } else {                                // Otherwise, just copy the character into the string
            copy += string[i];
        }
    }

    return copy;
}

/*! 
 *  @brief returnFileLines: takes all editor lines and converts them to a single string to write to the file
 * 
 *  @param lines An array of strings. Concatenates this array of strings into a single string to write to a file.
 *  @param option Can be either "text", "JSON", or neither. Determines whether to store the contents of editor lines or the blocks themselves (as JSON).
 * 
 *  @return The single string to write to the file.
 */
function returnFileLines(lines, option) {
    if (lines == null) {
        return "";
    }

    // Save the editor lines to a file, save the blocks as JSON, or neither (invalid option)
    if (option == "text") {
        // Copy the lines as text
        let string = "";

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[i].value.length; j++) {
                string += lines[i].value[j]
            }
            string += '\n';
        }
    
        return string;

    } else if (option == "JSON") { 
        // Copy the lines as JSON
        let arr = [];
        for (let line of lines) {
            if (line.type == UserInput) {
                arr.push({type: "UserInput", array: line.value});
            } else {
                arr.push({type: "Block", array: line.value});
            }
        }

        // Stringify the JSON
        let string = JSON.stringify(arr);

        // Format the string as JSON and return it
        return formatStringAsJSON(string);

    } else {
        console.log("An inappropriate option was provided to returnFileLines. \nOption must be either \"text\" or \"JSON\".");
        return null;
    }

    return string;
}

/*! 
 *  @brief Handles writing the blockList to a file when the button is pressed
 * 
 *  @param event The event that called this function.
 *  @param lines The array of data to write to the file.
 *  @param filename The name of the file to write the data to.
 * 
 *  @return None. Simply writes to the file and does not return any data.
 */
async function handleButton(event, lines, filename) {
    event.preventDefault();

    // Turn the lines into one long string
    let data;
    if (filename !== null) {
        if (filename.includes(".json")) {
            data = returnFileLines(lines, "JSON");
        } else {
            data = returnFileLines(lines, "text");
        }
    } else {
        console.log("No file name provided! Saving data as text...");
        data = returnFileLines(lines, "text");
    }

    // developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
    const blob = new Blob([data]);
    const newHandle = await window.showSaveFilePicker();
    const writableStream = await newHandle.createWritable();
    await writableStream.write(blob);
    await writableStream.close();
}

/*! 
 *  @brief FileWriter: uses a UserInput to get a file name and uses a button to write the contents of the editor lines to that file
 * 
 *  @param properties The properties that can be passed down to this component.
 * 
 *  @return Returns the jsx component representing the FileWriter.
 */
export function FileWriter(properties) {
    const [value, updateValue] = useState("file.cpp");

    return(
        <div className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            <div className={"row mh-100 p-0 m-0"} style={{height: '100%', width: '100%', overflow: 'hidden'}}>
                <div className={"d-flex col-10 p-0 m-0"} style={{height: '100%'}}>
                    {<UserInput
                        value={value} 
                        index={0} 
                        updateValue={updateValue} 
                        updateIndex={() => { return null }}
                        handleKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault() } }}
                    />}
                </div>
                <div className={"d-flex col-2 p-0 m-0"} style={{height: '100%'}}>
                    <button type={"button"} className={"btn btn-danger"} onClick={(event) => { handleButton(event, properties.blockList, value) }}>
                        {"Download"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FileWriter;