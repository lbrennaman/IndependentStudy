import { useState, useEffect } from 'react';
import Block from './Block';

export function DragZoneBlock(properties) {
    const [value, updateValue] = useState(properties.value);
    const [element, setElement] = useState(<Block values={properties.values} updateValue={updateValue}/>);

    useEffect(() => {
        console.log("DragZoneBlock Value Updated: ", value);
    }, [value])

    return(
        <div id={"DragZoneBlock: " + properties.blockNumber} 
            onMouseDown={(event) => properties.updateSelected(properties.blockNumber)}
            className={"container-fluid p-0 m-0"} 
            style={{height: '30px', width: '100%', border: '2px solid yellow'}}> {element} </div>
    );
}

export default DragZoneBlock;