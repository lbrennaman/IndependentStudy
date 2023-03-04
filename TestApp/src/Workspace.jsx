import { useState, useEffect } from 'react';

import WorkspaceLine from './WorkspaceLine';
import Block from './Block';
import UserInput from './UserInput';

import BlockZone from './BlockZone';
import Editor from './Editor';

function useValueHandler(val) {
    const [value, updateValue] = useState(val);

    useEffect(() => {

    }, [value]);

    return {value: value, updateValue: updateValue};
}

function BlockList(properties) {
    var elements = [];
    for (var i = 0; i < properties.list.length; i++) {
        console.log(properties.list[i]);
        var valueHandler = useValueHandler(properties.list[i]);
        if (properties.component[i] == UserInput) {
            elements.push(<UserInput value={valueHandler.value} updateValue={valueHandler.updateValue}/>);
        } else {
            elements.push(<Block values={valueHandler.value} updateValue={valueHandler.updateValue}/>);
        }
    }

    return(
        elements
    );
}

export function Workspace(properties) {
    
    return(
        <div id={"Workspace"} className={"d-flex col-10 p-0 m-0"} style={{height: '100%'}}>
            <div id={"Workspace Splitter"} className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                <div id={"BlockZone Container"} className={"d-flex col-6 p-0 m-0"} style={{height: '100%'}}>
                    <BlockZone>
                        <BlockList component={[UserInput, Block]} list={["Default", ["Value"]]}/>
                    </BlockZone>
                </div>
                <div id={"Editor Container"} className={"d-flex col-6 p-0 m-0"} style={{height: '100%'}}>
                    <Editor>
                        {"B"}
                    </Editor>
                </div>
            </div>
        </div>
    );
}

export default Workspace;