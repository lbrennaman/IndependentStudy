/// Import the useState hook from React
import { useState } from 'react';

/// Import all functions from helper
import * as helper from './Helper';

/// Import the UserInput component from UserInput.jsx
import UserInput from './UserInput';


/*! @file Block.jsx 
 *  @brief Block.jsx: file containing the Block component.
 *
 *  Contains the component that forms a Block (an element representing the code of a programming language).
 */

/*! 
 *  @brief BlockChild: a recursive React Component to help build a Block
 * 
 *  @param properties The properties that can be passed down to this component.
 * 
 *  @return Returns the jsx component representing a Block's child component.
 */

// BlockChild component: constructs a span for each child element of the block
function BlockChild(properties) {
    let elements = [];
    for (let i = 0; i < properties.values.length; i++) {
        elements.push( 
            <span key={"BlockChild line " + properties.index + " index: " + i} className={"d-flex px-1 m-0"} style={{height: '100%'}}>
                {properties.values[i]}
            </span>
        );
    }

    return(
        <span className={"d-flex p-0 m-0"} style={{height: '100%'}}>
            {elements}
        </span>
    );
}

/*! 
 *  @brief Block: Block component representing the code of a programming language.
 *
 *  An array of values where every odd index is a value and every even index is a UserInput. When concatenated into one string, represents one line of code.
 * 
 *  @param properties The properties that can be passed down to this component.
 * 
 *  @return Returns the jsx component representing a Block.
 */
export function Block(properties) {
    // The format of a block is values={[value, <UserInput/>, value, <UserInput/>, etc...]}
    // If this block has no values, then there is no block. Return null
    if (properties.values.length < 1) {
        return null;
    }

    // The index of the current UserInput in focus
    const [index, updateIndex] = useState(null);

    // Create a new array by replacing even indeces with UserInputs
    let array = [];
    for (let i = 0; i < properties.values.length; i++) {
        if (i % 2 == 1) {
            array.push(
                <UserInput 
                    value={properties.values[i]} 
                    index={i}
                    updateValue={(value) => {
                        // If this block's index is not null, meaning this block has an index in focus, allow the blockList to be updated
                        if (index !== null) {
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
            style={{height: '100%', width: '100%', overflow: 'hidden', overflowX: 'hidden'}} 
            onMouseDown={(event) => properties.updateIndex(properties.index)}>
            <BlockChild values={array} index={properties.index}/>
        </div>
    );
}

export default Block;