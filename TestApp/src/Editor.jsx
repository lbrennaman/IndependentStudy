import { useState } from 'react';

export function Editor(properties) {
    var lines = [];
    for (var i = 0; i < properties.editorLines.length; i++) {
        lines.push(
            <div key={"EditorLine: " + (i + 1)} className={"row p-0 m-0"} style={{height: '30px', width: '100%', border: '2px solid green'}}>
                {properties.editorLines[i]}
            </div>
        );
    }
    
    return(
        <div id={"EditorContainer"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {lines}
        </div>
    );
}

export default Editor;