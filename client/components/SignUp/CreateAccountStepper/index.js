import React, { useState } from "react";
import { Col, Row } from "antd";
import { Steps } from "antd";
const Step = Steps.Step;

import { AccountInfoComponent } from "../GetAccountInfo";
import { UpdateWeightGoalsComponent } from "../UpdateGoals";
import { BMRCalculator } from "../BMRCalulator";

export const CreateAccountStepper = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const stepContent = [
        <AccountInfoComponent goToNextStep={() => setCurrentStep(1)} />,
        <UpdateWeightGoalsComponent goToNextStep={() => setCurrentStep(2)} />
    ]

    return (
        <div className={`signup--steps signup--step-${currentStep}`}>
            <Steps size="small" current={currentStep}>
                <Step title="Account Information" description="Create an account." />
                <Step title="Body Information" description="Use body information to determine your daily intake." />
            </Steps>

            <div className="signup--currentstep">
                {
                    stepContent[currentStep]
                }
            </div>        
        </div>
    );
    // return (
    //     <Row >
    //         <Col xs={24} md={12} >
    //             <AccountInfoComponent />
    //         </Col>
    //         <Col xs={24} md={12}>
    //             <UpdateWeightGoalsComponent />
    //         </Col>
    //     </Row>
    // );
}