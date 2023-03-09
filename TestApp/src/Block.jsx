import { useState, useEffect } from 'react';
import * as helper from './Helper';
import UserInput from './UserInput';

// Recursive React Component
function BlockChild(properties) {
    // Copy array from index [1, length - 1]
    var copy = [];
    for (var i = 1; i < properties.values.length; i++) {
        copy.push(properties.values[i]);
    }

    // If the array has more than one string left, return a row with two columns: left -> values[0], right -> value[1 -> length - 1]
    if (properties.values.length > 1) {
        return(
            <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                <div className={"col-3 p-0 m-0"} style={{height: '100%'}}>
                    {properties.values[0]}
                </div>
                <div className={"col-9 p-0 m-0"} style={{height: '100%'}}>
                    <BlockChild values={copy}/>
                </div>
            </div>
        );
    } else { // Else, return a div with that remaining string
        return(
            <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                <div className={"col p-0 m-0"} style={{height: '100%'}}>
                    {properties.values[0]}
                </div>
            </div>
        );
    }
}

export function Block(properties) {
    // The format of a block is values={[value, <UserInput/>, value, <UserInput/>, etc...]}
    // If this block has no values, then there is no block. Return null
    if (properties.values.length < 1) {
        return null;
    }

    // The index of the current UserInput in focus
    const [index, updateIndex] = useState(null);

    // Create a new array by replacing even indeces with UserInputs
    var array = [];
    for (var i = 0; i < properties.values.length; i++) {
        if (i % 2 == 1) {
            array.push(
                <UserInput 
                    value={properties.values[i]} 
                    index={i}
                    updateValue={(value) => {
                        // If this block's index is not null, meaning this block has an index in focus, allow the blockList to be updated
                        if (index != null) {
                            properties.updateValue(helper.replaceArrayIndex(properties.values, index, value));
                        }
                    }} 
                    updateIndex={(index_j) => {
                        // Allow focusing on the UserInput to update the line number like normal
                        properties.updateIndex(properties.index);

                        // Update the index of this block to track which UserInput is in focus
                        updateIndex(index_j);
                    }}
                    handleKeyDown={properties.handleKeyDown}
                />
            );
        } else {
            array.push(properties.values[i]);
        }
    }

    return(
        <div id={"Block Container"} 
            className={"container-fluid p-0 m-0"} 
            style={{height: '100%', width: '100%', overflow: 'hidden', overflowX: 'auto'}} 
            onMouseDown={(event) => properties.updateIndex(properties.index)}>
            <BlockChild values={array}/>
        </div>
    );
}

export default Block;