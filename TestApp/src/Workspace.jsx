import { useState, useEffect } from 'react';
import BlockZoneLine from './BlockZoneLine';
import BlockZone from './BlockZone';
import Block from './Block';
import Editor from './Editor';
import UserInput from './UserInput';

// React custom hook used to handle the update procedure for the lines of the editor
export function useEditorUpdater(editorLines, lineNumber, updateInput, updateEditor) {
    // Hold the value of the current UserInput (if this line's element is a UserInput)
    const [value, updateValue] = useState("");

    // When the value of the current UserInput changes, ensure the corresponding editor line is updated as well
    useEffect(() => {
        // Hard copy editorLines
        var copy = [];
        for (var i = 0; i < editorLines.length; i++) {
            copy.push(editorLines[i]);
        }

        // If there is a value, update the editorLine and current input
        if (value) {
            copy[lineNumber] = value;
            updateInput(value);
        } else {
            copy[lineNumber] = "";
            updateInput("");
        }

        // Update the editor to reflect this change
        updateEditor(
            <Editor 
                editorLines={copy}
            />);

    }, [value]);

    // Return this value and its update function
    return {value: value, updateValue: updateValue};
}

export function Workspace(properties) {
    // Remember which line is in focus: defaults to line 0 since only line 0 exists upon instantiation
    const [selected, updateSelected] = useState(0);

    const [newLine, updateNewLine] = useState(0);

    // Keep track of the value of each line in the text editor
    const [editorLines, updateEditorLines] = useState([]);

    // Keep track of the text editor component
    const [editor, updateEditor] = useState(
        <Editor 
            editorLines={editorLines}
        />
    );

    // Handles the update procedure for the editor's corresponding line
    const editorLineUpdater = [];
    editorLineUpdater.push(useEditorUpdater(editorLines, 0, properties.updateInput, updateEditor));

    // Initialize the list of blocks to display in the BlockZone
    const [blocks, updateBlocks] = useState([
        <BlockZoneLine 
            key={"BlockZone: " + 0} 
            editorLines={editorLines} 
            updateEditorLines={updateEditorLines} 
            updateEditor={updateEditor}
            updateSelected={updateSelected}
            updateInput={properties.updateInput} 
            lineNumber={0}

            // Examples of setting element to either a UserInput or element
            // element={<UserInput setValue={editorLineUpdater[0].updateValue} lineNumber={properties.lineNumber}/>}
            // element={<Block key={"DragZoneBlock: " + properties.blockNumber} values={["set ", ""]} updateValue={blockValueUpdater.updateValue}/>}
            // element={<Block key={"DragZoneBlock: " + properties.blockNumber} values={["int main(", "", ") {"]} updateValue={editorLineUpdater.updateValue}/>}

            element={<UserInput setValue={editorLineUpdater[0].updateValue} lineNumber={properties.lineNumber}/>}
        />
    ]);

    // Create the blockzone using the list of blocks
    const [blockZone, updateBlockZone] = useState(
        <BlockZone 
            blocks={blocks}
        />
    );

    return(
        <div className={"d-flex col-10 p-0 m-0"}>
            <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}> 
                <div className={"d-flex col-6 p-0 m-0"} style={{height: '100%', border: '2px solid blue'}}>
                    {blockZone}
                </div>
                <div className={"d-flex col-6 p-0 m-0"} style={{height: '100%', border: '2px solid blue'}}> 
                    {editor}
                </div>
            </div>
        </div>
    );
}

export default Workspace;