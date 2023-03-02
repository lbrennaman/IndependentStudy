import { useState, useEffect } from 'react';
import BlockZoneLine from './BlockZoneLine';
import BlockZone from './BlockZone';
import Editor from './Editor';

export function Workspace(properties) {
    const [editorLines, updateEditorLines] = useState([]);

    const [editor, updateEditor] = useState(
        <Editor 
            editorLines={editorLines}
        />
    );

    const [blocks, updateBlocks] = useState([
        <BlockZoneLine 
            key={"BlockZone: " + 0} 
            editorLines={editorLines} 
            updateEditorLines={updateEditorLines} 
            updateEditor={updateEditor}
            updateSelected={properties.updateSelected}
            updateInput={properties.updateInput} 
            lineNumber={0}
        />
    ]);

    const [blockZone, updateBlockZone] = useState(
        <BlockZone 
            blocks={blocks}
        />
    );

    return(
        <div className={"col-10 p-0 m-0"}>                                                                      {/* BlockZone/Editor Container */}
            <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>                             {/* BlockZone/Editor Splitter */}
                <div className={"d-flex col-6 p-0 m-0"} style={{height: '100%', border: '2px solid blue'}}>     {/* BlockZone Column */}
                    {blockZone}
                </div>
                <div className={"d-flex col-6 p-0 m-0"} style={{height: '100%', border: '2px solid blue'}}>     {/* Editor Column */}
                    {editor}
                </div>
            </div>
        </div>
    );
}

export default Workspace;