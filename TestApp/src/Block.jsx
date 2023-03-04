import { useState, useEffect } from 'react';
import UserInput from './UserInput';

// Custom hook to properly update subcomponent values of a block
function useValueHandler(list, index, update) {
    // Create a React hook variable to store a value and create a function to update that value
    const [value, updateValue] = useState(list[index]);

    // When the value is updated, update the corresponding index of list
    useEffect(() => {
        // Hard copy list
        var copy = [];
        for (var i = 0; i < list.length; i++) {
            copy.push(list[i]);
        }

        // Replace index of list with value to update
        copy[index] = value;

        // Update the list using the copy
        update(copy);
    }, [value]);

    // Return this value and its update method so that it can be accessed from outside sources
    return {value: value, updateValue: updateValue};
}

export function Block(properties) {
    // The format of a block is values={[value, <UserInput/>, value, <UserInput/>, etc...]}
    // If this block has no values, then there is no block. Return null
    if (properties.values.length < 1) {
        return null;
    }

    // Store an array containing the string representation of each block (each value of each subcomponent in order)
    const [stringRepresentation, updateStringRepresentation] = useState(() => {
        var array = [];
        for (var i = 0; i < properties.values.length; i++) {
            array.push(properties.values[i]);
        }
        return array;
    });

    // In order to update the stringRepresentation properly, each index of stringRepresentation must be updated when the value of each subcomponent is updated.
    // This requires each index to be directly related to a React hook, which is impossible in the above declaration of stringRepresentation.
    // The following lines use a custom hook as a workaround to this issue by creating a React hook variable for each index of stringRepresenation, and each index
    // of stringRepresentation is properly updated upon updating the hook variable due to the subsequent definition of values

    // NOTE: DO NOT USE HOOKS WITHIN LOOPS
    const valueHandler = [];
    for (var i = 0; i < properties.values.length; i++) {
        valueHandler.push(useValueHandler(stringRepresentation, i, updateStringRepresentation));
    }

    // Define the array of values that this block represents and directly tie each index to a valueHandler to update each respective index of stringRepresentation
    const [values, updateValues] = useState(() => {
        var array = [];
        for (var i = 0; i < properties.values.length; i++) {
            if (i % 2 == 1) {
                array.push(<UserInput updateValue={valueHandler[i].updateValue}/>)
            } else {
                array.push(properties.values[i]);
            }
        }
        return array;
    });

    useEffect(() => {
        console.log("String rep updated");
        properties.updateValue(() => {
            var string = "";
            for (var i = 0; i < stringRepresentation.length; i++) {
                string += stringRepresentation[i];
            }
            return string;
        })
    }, [stringRepresentation])

    var element = null;
    for (var i = properties.values.length - 1; i >= 0; i--) {
        if (i == properties.values.length - 1) {
            element = (
                <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                    <div className={"col p-0 m-0"} style={{height: '100%'}}>
                        {values[i]}
                    </div>
                </div>
            )
        } else {
            element = (
                <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                    <div className={"col p-0 m-0"} style={{height: '100%'}}>
                        {values[i]}
                    </div>
                    <div className={"col p-0 m-0"} style={{height: '100%'}}>
                        {element}
                    </div>
                </div>
            )
        }
    }

    return(
        element
    );
}

export default Block;