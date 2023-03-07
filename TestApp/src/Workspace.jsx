import { useState, useEffect, useRef } from 'react';
import * as helper from './WorkspaceHelper';

import BlockZone from './BlockZone';
import Editor from './Editor';

export function Workspace(properties) {
    const [value, updateValue] = useState("");          // Value currently being typed into a UserInput in the Workspace
    const [index_i, updateIndex_i] = useState(null);    // Line number currently in focus
    const [index_j, updateIndex_j] = useState(null);    // Block UserInput index that is currently in focus

    // Parameters can be cleaned by using JSON: settings = {list: properties.blockList, index: index_i, updateBlockList: properties...}, pass settings to functions
    const blockList = helper.createBlockList(properties.blockList, index_i, properties.updateBlockList, updateValue, {i: updateIndex_i, j: updateIndex_j});
    const editorLines = helper.createEditorLines(properties.blockList, index_i, properties.updateBlockList, updateValue, {i: updateIndex_i, j: updateIndex_j});

    /* Only used for debugging purposes to show which indeces are in focus
    useEffect(() => {
        console.log("Update Index i: ", index_i);
    }, [index_i]);

    useEffect(() => {
        console.log("Update Index j: ", index_j);
    }, [index_j]);
    */

    // Whenever a UserInput value is changed (so long as index_i is a valid line number), change its corresponding index in the blockList
    useEffect(() => {
        properties.updateBlockList(() => {
            if (index_i != null) {
                // Valid line number, edit the blockList so that it contains the updated value in the corresponding index
                return helper.replaceArrayIndex(properties.blockList, index_i, {type: properties.blockList[index_i].type, value: value});
            } else {
                // Not a valid line number, return the blockList so that the blockList remains unchanged
                return properties.blockList;
            }
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

export default Workspace;