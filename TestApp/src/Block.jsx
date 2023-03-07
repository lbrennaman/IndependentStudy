import { useState, useEffect } from 'react';
import UserInput from './UserInput';

function BlockChild(properties) {
    var copy = [];
    for (var i = 1; i < properties.values.length; i++) {
        copy.push(properties.values[i]);
    }

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
    } else {
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

    // Create a new array by replacing even indeces with UserInputs
    var array = [];
    for (var i = 0; i < properties.values.length; i++) {
        if (i % 2 == 1) {
            array.push(
                <UserInput 
                    value={properties.values[i]} 
                    index={properties.index} 
                    updateValue={properties.updateValue} 
                    updateIndex={properties.updateIndex}
                    handleKeyDown={properties.handleKeyDown}
                />
            );
        } else {
            array.push(properties.values[i]);
        }
    }

    return(
        <div id={"Block Container"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            <BlockChild values={array}/>
        </div>
    );
}

export default Block;