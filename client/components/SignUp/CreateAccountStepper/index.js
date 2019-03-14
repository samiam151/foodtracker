import React, { useState } from "react";
import { Steps } from "antd";
const Step = Steps.Step;

import { AccountInfoComponent } from "../GetAccountInfo";
import { BMRCalculator } from "../BMRCalulator";

export const CreateAccountStepper = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const stepContent = [
        <AccountInfoComponent goToNextStep={() => setCurrentStep(1)} />,
        <BMRCalculator goToNextStep={() => setCurrentStep(2)} />
    ]

    return (
        <div className="signup--steps">
            <Steps progressDot current={currentStep}>
                <Step title="Account Information" description="Create an account." onClick={() => setCurrentStep(0)} />
                <Step title="Body Information" description="Use body information to determine your daily intake." onClick={() => setCurrentStep(1)} />
                <Step title="Set Goals" description="Determine caloric budget based on your goals." onClick={() => setCurrentStep(2)} />
            </Steps>

            <div className="signup--currentstep">
                {
                    stepContent[currentStep]
                }
            </div>        
        </div>
    );
}