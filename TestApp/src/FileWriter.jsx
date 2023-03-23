/// Import the useState hook from React
import { useState } from 'react';

/// Import the UserInput component from UserInput.jsx
import UserInput from './UserInput';

/*! @file FileWriter.jsx 
 *  @brief FileWriter.jsx: file containing the FileWriter component.
 *
 *  Contains the component that handles writing the contents of the editor lines to a file.
 */

/*! 
 *  @brief returnFileLines: takes all editor lines and converts them to a single string to write to the file
 * 
 *  @param lines An array of strings. Concatenates this array of strings into a single string to write to a file.
 * 
 *  @return The single string to write to the file.
 */
function returnFileLines(lines) {
    if (lines == null) {
        return "";
    }

    var string = "";
    for (var i = 0; i < lines.length; i++) {
        for (var j = 0; j < lines[i].value.length; j++) {
            string += lines[i].value[j]
        }
        string += '\n';
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
    let data = returnFileLines(lines);
    console.log("Data: ", data);

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