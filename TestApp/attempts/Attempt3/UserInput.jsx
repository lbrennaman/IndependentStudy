function UserInput(properties) {
    return(
        <form id={"Form"} className={"p-0 m-0"} style={{height: '100%', width:'100%'}}>
            <textarea id={"Bar"} className={"p-0 m-0"}
                onInput={(event) => properties.setValue(event.target.value)}
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
                    overflowX: 'auto'
                }}>
            </textarea>
        </form>
    );
}

export class UserInputController {
    constructor(settings = {}) {
        this.component = <UserInput setValue={settings.setValue}/>
    }

    getComponent() {
        return this.component;
    }
}

export default UserInputController;