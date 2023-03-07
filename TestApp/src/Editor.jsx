import { useState } from 'react';

export function Editor(properties) {
    return(
        <div id={"EditorContainer"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {properties.children}
        </div>
    );
}

export default Editor;