import { useState, useEffect } from 'react';
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

    // Store this block's values in the block so that the block may edit them
    const [values, updateValues] = useState(properties.values);

    // UserInput indeces can only be 1, 3, 5... 
    // If length <= 1, then index 1 doesn't exist, else default index to 1
    const [index, updateIndex] = useState((values.length > 1) ? 1 : null); 

    // Create a new array by replacing even indeces with UserInputs
    var array = [];
    for (var i = 0; i < values.length; i++) {
        if (i % 2 == 1) {
            array.push(
                <UserInput 
                    value={values[i]} 
                    index={i}
                    updateValue={(value) => {
                        var copy = [];
                        var i = 0;

                        // Copy values from [0, index - 1]
                        for (i; i < index; i++) {
                            copy.push(values[i]);
                        }

                        // Replace value at index
                        copy.push(value);
                        i++;

                        // Copy values from [index + 1, length - 1]
                        for (i; i < values.length; i++) {
                            copy.push(values[i]);
                        }

                        // Update the values stored in this block
                        updateValues(copy);
                    }} 
                    updateIndex={updateIndex}
                    handleKeyDown={properties.handleKeyDown}
                />
            );
        } else {
            array.push(properties.values[i]);
        }
    }

    useEffect(() => {
        console.log("Block index j changed! Index j: ", index);
        properties.updateIndex.j(index);
    }, [index]);

    // When the values in this block change, update the values stored in the blockList
    useEffect(() => {
        console.log("Block values changed!");

        // Ensure the blockList is pointing to the right line
        properties.updateIndex.i(properties.index);

        // Update the values of the block in that line
        properties.updateValue(values);
    }, [values]);

    return(
        <div id={"Block Container"} 
            className={"container-fluid p-0 m-0"} 
            style={{height: '100%', width: '100%'}} 
            onMouseDown={(event) => {properties.updateIndex.i(properties.index)}}>
            <BlockChild values={array}/>
        </div>
    );
}

export default Block;