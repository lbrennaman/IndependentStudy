import { useState, useEffect } from 'react';

import * as helper from './Helper';
import UserInput from './UserInput';

// DragZone component: manages displaying the list of blocks in the blockList, also contains a search bar for filtering the blockList.
export function DragZone(properties) {
    const [index, updateIndex] = useState(null);

    // Create the list of blocks to display in the dragzone
    var blockList = helper.createDragZoneList(properties.blockList, properties.updateSelected, updateIndex);

    // When a block is clicked (and index is updated), update the selected block to the clicked block
    useEffect(() => {
        if (index != null) {
            properties.updateSelected(properties.blockList[index]);
            updateIndex(null);
        }
    }, [index]);

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