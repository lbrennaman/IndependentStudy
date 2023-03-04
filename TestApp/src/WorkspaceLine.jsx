import { useState } from 'react';

import Block from './Block';
import UserInput from './UserInput';

function useElement(properties, updateValue) {
    if (properties.component == UserInput) {
        const [component, updateComponent] = useState(<properties.component updateValue={updateValue}/>);
        return {component: component, updateComponent: updateComponent};
    } else {
        const [component, updateComponent] = useState(<properties.component values={properties.values} updateValue={updateValue}/>);
        return {component: component, updateComponent: updateComponent};
    }
}

export function WorkspaceLine(properties) {
    const [value, updateValue] = useState("");
    const element = useElement(properties, updateValue);

    return(
        <div id={"WorkspaceLine: " + properties.index}
             className={"row p-0 m-0"} 
             style={{height: '30px', width: '100%', border: '1px solid black'}}>
            <div id={"BlockZoneLine: " + properties.index} className={"col-6 p-0 m-0"} style={{height: '100%'}}>
                {element.component}
            </div>
            <div id={"EditorLine: " + properties.index} className={"col-6 p-0 m-0"} style={{height: '100%'}}>
                {value}
            </div>
        </div>
    );
}

export default WorkspaceLine;