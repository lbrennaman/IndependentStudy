import { useState, useEffect } from 'react';
import Editor from './Editor'
import UserInput from './UserInput'

export function Block(properties) {
    const [leftValue, updateLeftValue] = useState(properties.leftValue);
    const [rightValue, updateRightValue] = useState(properties.rightValue);
    const [leftOp, updateLeftOp] = useState(properties.leftOp);
    const [rightOp, updateRightOp] = useState(properties.rightOp);
    const [leftElement, setLeftElement] = useState(
        <UserInput setValue={updateLeftValue} handleKeyDown={properties.handleKeyDown} lineNumber={properties.lineNumber}/>);
    const [rightElement, setRightElement] = useState(
        <UserInput setValue={updateRightValue} handleKeyDown={properties.handleKeyDown} lineNumber={properties.lineNumber}/>);

    useEffect(() => {
        // Set this index of editorLines to leftValue + rightValue
        // UpdateEditorLines to this new editorLines
        var copy = properties.editorLines;
        if (leftValue && rightValue) {
            copy[properties.lineNumber] = leftValue + rightValue;
        } else if (leftValue) {
            copy[properties.lineNumber] = leftValue;
        } else if (rightValue) {
            copy[properties.lineNumber] = rightValue;
        } else {
            copy[properties.lineNumber] = "";
        }
        properties.updateEditor(
            <Editor 
                editorLines={properties.editorLines}
            />);
    }, [leftValue, rightValue])

    return(
        <div id={properties.id} className={"container-fluid p-0 m-0"} style={{height: '30px', width: '100%', border: '2px solid yellow'}}> {/* Block Container/Border */}
            <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>                                     {/* Block Row Splitter */}
                <div className={"d-flex col p-0 m-0"} style={{height: '100%'}}>                                         {/* Block Left Column */}
                    <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>                             {/* Block Left Column Splitter */}
                        <div className={"d-flex col p-0 m-0"} style={{height: '100%', width: '100%'}}>                  {/* Block Left Column Left Operator */}
                            {leftOp}                                                                                    {/* Left Op */}
                        </div>
                        <div className={"d-flex col p-0 m-0"} style={{height: '100%', width: '100%'}}>                  {/* Block Left Column UserInput*/}
                            {leftElement}                                                                {/* Left Element*/}
                        </div>
                        <div className={"d-flex col p-0 m-0"} style={{height: '100%', width: '100%'}}>                  {/* Block Left Column Right Operator*/}
                            {rightOp}                                                                                   {/* Right Op */}
                        </div>
                    </div>
                </div>
                <div className={"d-flex col p-0 m-0"} style={{height: '100%'}}>                                         {/* Block Right Column*/}
                    {rightElement}                                                                       {/* Right Element */}
                </div>
            </div>
        </div>
    );
}


export default Block;