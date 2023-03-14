import { useState } from 'react';

import * as helper from './Helper';
import UserInput from './UserInput';

export function DragZone(properties) {
    var blockList = helper.createDragZoneList(properties.blockList, properties.updateSelected);

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
                    {blockList}
                </div>
            </div>
        </div>
    );
}

export default DragZone;