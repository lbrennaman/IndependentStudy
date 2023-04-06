/*! @file UserInput.jsx 
 *  @brief UserInput.jsx: file containing the UserInput component.
 *
 *  Contains the component that holds a simple text area, but uses events as specified by its properties.
 */

/*! 
 *  @brief UserInput: a simple text area with a specific style. Handles data based on the given properties.
 *
 *  @param properties The properties that can be passed down to this component.
 * 
 *  @return Returns the jsx component representing the UserInput.
 */
function UserInput(properties) {
    return(
        <form id={"UserInputForm"} className={"p-0 m-0"} style={{height: '100%', width:'100%'}}>
            <textarea id={"UserInputTextArea"} className={"p-0 m-0"}
                value={properties.value}
                onInput={(event) => properties.updateValue(event.target.value)}
                onFocus={(event) => properties.updateIndex(properties.index)}
                onKeyDown={(event) => properties.handleKeyDown(event)}
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
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    backgroundColor: '#343a40',
                    color: 'white'
                }}>
            </textarea>
        </form>
    );
}

export default UserInput;