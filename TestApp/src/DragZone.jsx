import { useState } from 'react';
import UserInput from './UserInput';
import DragZoneBlock from './DragZoneBlock';

export function DragZone(properties) {
    var blocks = [];
    if (properties.blockList != null) {
        for (var i = 0; i < properties.blockList.length; i++) {
            blocks.push(<DragZoneBlock key={"DragZoneBlock: " + i} blockNumber={i} values={properties.blockList[i]} updateSelected={properties.updateSelected}/>);
        }
    }

    return(
        <div id={"DragZone"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            <div id={"DragZoneSplitter"} className={"row p-0 m-0"} style={{height: '30px', width: '100%'}}>
                <div id={"DragZoneContainer"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
                    <UserInput 
                        updateValue={properties.updateSearch} 
                        updateIndex={() => { return null; }} 
                        handleKeyDown={(event) => { 
                            if (event.key === 'Enter') { 
                                event.preventDefault();
                            } 
                        }}
                    />
                </div>
            </div>
            <div id={"DragZoneBlockListViewContainerRow"} className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                <div id={"DragZoneBlockListViewContainer"} className={"container-fluid p-0 m-0"} style={{height: '30px', width: '100%'}}>
                    {blocks}
                </div>
            </div>
        </div>
    );
}

export default DragZone;