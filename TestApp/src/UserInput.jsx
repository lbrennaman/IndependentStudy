import { useState } from 'react';

function UserInput(properties) {
    return(
        <form id={"UserInputForm"} className={"p-0 m-0"} style={{height: '100%', width:'100%'}}>
            <textarea id={"UserInputTextArea"} className={"p-0 m-0"}
                defaultValue={properties.value}
                onInput={(event) => properties.updateValue(event.target.value)}
                style={{
                    height: '100%', 
                    width:'100%', 
                    overflow: 'hidden', 
                    resize: 'none', 
                    border: 'none', 
                    outline: 'none', 
                    boxShadow: 'none',
                    whiteSpace: 'pre',
                    overflowWrap: 'normal',
                    overflowX: 'auto',
                    backgroundColor: '#343a40',
                    color: 'white'
                }}>
            </textarea>
        </form>
    );
}

export default UserInput;