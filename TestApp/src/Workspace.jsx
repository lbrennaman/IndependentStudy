import { useState, useEffect } from 'react';

import WorkspaceLine from './WorkspaceLine';
import Block from './Block';
import UserInput from './UserInput';

function handleKeyDown(event, list, updateList) {
    if (event.key === 'Enter') {
        event.preventDefault();

        console.log("Enter");
    }
}

export function Workspace(properties) {
    // Initialize the list of blocks to display in the BlockZone
    const [workspaceLines, updateWorkspaceLines] = useState([
        <WorkspaceLine key={"Workspace Line: 0"} component={UserInput} index={0}/>
    ]);

    return(
        <div id={"Workspace"} className={"d-flex col-10 p-0 m-0"} style={{height: '100%'}} 
            onKeyDown={(event) => handleKeyDown(event, workspaceLines, updateWorkspaceLines)}>
            <div id={"Workspace Line Container"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
                {workspaceLines}
            </div> 
        </div>
    );
}

export default Workspace;