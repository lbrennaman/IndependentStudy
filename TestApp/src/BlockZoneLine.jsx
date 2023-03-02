import { useState, useEffect } from 'react';
import Editor from './Editor'
import UserInput from './UserInput'

export function BlockZoneLine(properties) {
    const [value, updateValue] = useState(properties.value);
    const [element, setElement] = useState(<UserInput setValue={updateValue} lineNumber={properties.lineNumber}/>);

    useEffect(() => {
        var copy = properties.editorLines;

        if (value) {
            copy[properties.lineNumber] = value;
            properties.updateInput(value);
        } else {
            copy[properties.lineNumber] = "";
            properties.updateInput("");
        }

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