import { useState, useEffect } from 'react';

import WorkspaceLine from './WorkspaceLine';
import Block from './Block';
import UserInput from './UserInput';

import BlockZone from './BlockZone';
import Editor from './Editor';

export function Workspace(properties) {
    /*
    const [value, updateValue] = useState("");
    const [index, updateIndex] = useState(0);

    const blockList = [];
    for (var i = 0; i < properties.blockList.length; i++) {
        if (properties.blockList[i].type == UserInput) {
            console.log("Constructing blocklist[i]: ", properties.blockList[i].value);
            blockList.push(
                <div key={"BlockZone Row: " + i} className={"row p-0 m-0"} style={{height: '30px', width: '100%'}}>
                    <UserInput 
                        value={properties.blockList[i].value} 
                        index={i} 
                        updateValue={updateValue} 
                        updateIndex={updateIndex}
                        handleKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                properties.updateBlockList(() => {
                                    var array = [];
                                    var i = 0;

                                    if (index == 0) {
                                        array.push(properties.blockList[0]);
                                        i++;
                                        array.push({type: UserInput, value: "new Line"});
                                        for (i; i < properties.blockList.length; i++) {
                                            array.push(properties.blockList[i]);
                                        }
                                    } else {
                                        for (i; i < index; i++) {
                                            array.push(properties.blockList[i]);
                                        }
                                        array.push({type: UserInput, value: "new Line"});
                                        for (i; i < properties.blockList.length; i++) {
                                            array.push(properties.blockList[i]);
                                        }
                                    }

                                    return array;
                                });
                            }
                        }}
                    />
                </div>
            )
        }
    }

    useEffect(() => {
        console.log("Update Index: ", index);
    }, [index]);

    useEffect(() => {
        properties.updateBlockList(() => {
            var array = [];
            var i = 0;

            // Save indeces from [0, index), if index == 0, skip to updating index
            for (i; i < index; i++) {
                array.push(properties.blockList[i]);
            }

            // Update index with current value being typed, ensure type of block remains the same: update array[index]
            array.push({type: properties.blockList[index].type, value: value});
            i++; // Updated index, move to index + 1

            // Save indeces from [index + 1, end of array]
            for (i; i < properties.blockList.length; i++) {
                array.push(properties.blockList[i]);
            }

            return array;
        })
    }, [value]);
    */

    return(
        <div id={"Workspace"} className={"d-flex col-10 p-0 m-0"} style={{height: '100%'}}>
            <div id={"Workspace Splitter"} className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                <div id={"BlockZone Container"} className={"d-flex col-6 p-0 m-0"} style={{height: '100%'}}>
                    <BlockZone>
                        {blockList}
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