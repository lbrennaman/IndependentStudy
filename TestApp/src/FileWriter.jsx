import { useState, useEffect } from 'react';

import UserInput from './UserInput';

// Takes all editor lines and converts them to a single string to write to the file
function returnFileLines(lines) {
    if (lines == null) {
        return "";
    }

    var string = "";
    for (var i = 0; i < lines.length; i++) {
        string += lines[i].value + '\n';
    }

    console.log("File lines: ", string);
    return string;
}

// Handles writing the blockList to a file when the button is pressed
async function handleButton(event, lines, filename) {
    event.preventDefault();

    // Turn the lines into one long string
    let data = returnFileLines(lines);

    // developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
    // This stores the data as a blob and writes it to a file
    // Ideally a file picker should not be used, it should create a file using the given filename
    const blob = new Blob([data]);
    const newHandle = await window.showSaveFilePicker();
    const writableStream = await newHandle.createWritable();
    await writableStream.write(blob);
    await writableStream.close();
}

// FileWriter component: uses a UserInput to get a file name and uses a button to write the contents of the editor lines to that file
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