import { useState, useEffect } from 'react';

import Block from './Block';
import Editor from './Editor';
import UserInput from './UserInput';

// React component to handle a line within the blockzone (element can be a UserInput or Block)
export function BlockZoneLine(properties) {
    return(
        <div onMouseDown={(event) => properties.updateSelected(properties.lineNumber)}
            className={"container-fluid p-0 m-0"} style={{height: '30px', width: '100%', border: '2px solid yellow'}}>
            <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>                                 
                <div className={"d-flex col p-0 m-0"} style={{height: '100%'}}>                                        
                    {properties.element}                                                                      
                </div>
            </div>
        </div>
    );
}


export default BlockZoneLine;