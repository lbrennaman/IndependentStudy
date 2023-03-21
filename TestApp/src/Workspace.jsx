import { useState, useEffect, useRef } from 'react';
import * as helper from './Helper';

// Workspace component: holds the BlockZone (list of blocks representing code) and the Editor (the actual code the blocks translate to)
export function Workspace(properties) {
    const [value, updateValue] = useState("");      // Value currently being typed into a UserInput in the Workspace
    const [index, updateIndex] = useState(null);    // Line number currently in focus

    // Parameters can be cleaned by using JSON: settings = {list: properties.blockList, index: index, updateBlockList: properties...}, pass settings to functions
    const blockList = helper.createBlockList(properties.blockList, index, properties.updateBlockList, updateValue, updateIndex);
    const editorLines = helper.createEditorLines(properties.blockList, index, properties.updateBlockList, updateValue, updateIndex);

    // Whenever a UserInput value is changed (so long as index is a valid line number), change its corresponding index in the blockList
    useEffect(() => {
        properties.updateBlockList(() => {
            if (index != null) {
                // Valid line number, edit the blockList so that it contains the updated value in the corresponding index
                return helper.replaceArrayIndex(properties.blockList, index, {type: properties.blockList[index].type, value: value});
            } else {
                // Not a valid line number, return the blockList so that the blockList remains unchanged
                return properties.blockList;
            }
        })

        properties.updateInput(value);
    }, [value]);

    // Whenever the line in focus changes, let main know which line is in focus
    useEffect(() => {
        if (index != null) {
            properties.updateMainIndex(index);
        }
    }, [index]);

    return(
        <div id={"Workspace"} className={"d-flex col-10 p-0 m-0"} style={{height: '100%'}}>
            <div id={"Workspace Splitter"} className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                <div id={"BlockZone Container"} className={"d-flex col-6 p-0 m-0"} style={{height: '100%'}}>
                    <div id={"BlockZone"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
                        {blockList}
                    </div>
                </div>
                <div id={"Editor Container"} className={"d-flex col-6 p-0 m-0"} style={{height: '100%'}}>
                    <div id={"Editor"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
                        {editorLines}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Workspace;