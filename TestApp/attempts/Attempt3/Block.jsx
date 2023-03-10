import { useState, useEffect } from 'react';
import UserInputController from './UserInput'

function Block(properties) {
    const [leftValue, setLeftValue] = useState(properties.leftValue);
    const [rightValue, setRightValue] = useState(properties.rightValue);
    const [leftOp, setLeftOp] = useState(properties.leftOp);
    const [rightOp, setRightOp] = useState(properties.rightOp);
    const [leftElement, setLeftElement] = useState(new UserInputController({setValue: setLeftValue}));
    const [rightElement, setRightElement] = useState(new UserInputController({setValue: setRightValue}));

    useEffect(() => {
        properties.controller.setLeftValue(leftValue);
    }, [leftValue])

    useEffect(() => {
        properties.controller.setLeftValue(rightValue);
    }, [rightValue])

    return(
        <div className={"container-fluid p-0 m-0"} style={{height: '30px', width: '100%', border: '2px solid yellow'}}> {/* Block Container/Border */}
            <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>                                     {/* Block Row Splitter */}
                <div className={"d-flex col p-0 m-0"} style={{height: '100%'}}>                                         {/* Block Left Column */}
                    <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>                             {/* Block Left Column Splitter */}
                        <div className={"d-flex col p-0 m-0"} style={{height: '100%', width: '100%'}}>                  {/* Block Left Column Left Operator */}
                            {leftOp}                                                                                    {/* Left Op */}
                        </div>
                        <div className={"d-flex col p-0 m-0"} style={{height: '100%', width: '100%'}}>                  {/* Block Left Column UserInput*/}
                            {leftElement.getComponent()}                                                                {/* Left Element*/}
                        </div>
                        <div className={"d-flex col p-0 m-0"} style={{height: '100%', width: '100%'}}>                  {/* Block Left Column Right Operator*/}
                            {rightOp}                                                                                   {/* Right Op */}
                        </div>
                    </div>
                </div>
                <div className={"d-flex col p-0 m-0"} style={{height: '100%'}}>                                         {/* Block Right Column*/}
                    {rightElement.getComponent()}                                                                       {/* Right Element */}
                </div>
            </div>
        </div>
    );
}

export class BlockController {
    constructor(settings = {leftValue: "", rightValue: "", leftOp: "", rightOp: ""}) {
        this.leftValue = settings.leftValue;
        this.rightValue = settings.rightValue;
        this.leftOp = settings.leftOp;
        this.rightOp = settings.rightOp;
        this.component = <Block controller={this} leftValue={this.leftValue} rightValue={this.rightValue} leftOp={this.leftOp} rightOp={this.rightOp}/>;
    }

    setLeftValue(leftValue) {
        this.leftValue = leftValue;
    }

    setRightValue(rightValue) {
        this.rightValue = rightValue;
    }

    getValue() {
        return this.leftValue + this.rightValue;
    }

    getComponent() {
        return this.component
    }
}

export default BlockController;