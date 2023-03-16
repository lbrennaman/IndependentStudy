import { useState, useEffect } from 'react';

import UserInput from './UserInput';

export function FileWriter(properties) {
    const [value, updateValue] = useState("file.cpp");

    return(
        <div className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            <div className={"row mh-100 p-0 m-0"} style={{height: '100%', width: '100%', overflow: 'hidden'}}>
                <div className={"d-flex col-10 p-0 m-0"} style={{height: '100%'}}>
                    <UserInput
                        value={value} 
                        index={0} 
                        updateValue={updateValue} 
                        updateIndex={() => { return null }}
                        handleKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault() } }}
                    />
                </div>
                <div className={"d-flex col-2 p-0 m-0"} style={{height: '100%'}}>
                    {"Button"}
                </div>
            </div>
        </div>
    );
}

export default FileWriter;