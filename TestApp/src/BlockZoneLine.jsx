import { useState, useEffect } from 'react';
import Editor from './Editor'
import UserInput from './UserInput'

export function BlockZoneLine(properties) {
    const [value, updateValue] = useState(properties.value);
    const [element, setElement] = useState(<UserInput setValue={updateValue} lineNumber={properties.lineNumber}/>);

    useEffect(() => {
        // Hard copy editorLines
        var copy = [];
        for (var i = 0; i < properties.editorLines.length; i++) {
            copy.push(properties.editorLines[i]);
        }

        // If there is a value, update the editorLine and current input
        if (value) {
            copy[properties.lineNumber] = value;
            properties.updateInput(value);
        } else {
            copy[properties.lineNumber] = "";
            properties.updateInput("");
        }

        // Update the editor to reflect this change
        properties.updateEditor(
            <Editor 
                editorLines={copy}
            />);

    }, [value])

    return(
        <div onMouseDown={(event) => properties.updateSelected(properties.lineNumber)}
            className={"container-fluid p-0 m-0"} style={{height: '30px', width: '100%', border: '2px solid yellow'}}>
            <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>                                 
                <div className={"d-flex col p-0 m-0"} style={{height: '100%'}}>                                        
                    {element}                                                                      
                </div>
            </div>
        </div>
    );
}


export default BlockZoneLine;