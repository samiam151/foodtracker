import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { Steps, Button, Divider } from 'antd';
import { store } from "../../store";
import { SearchFoodComponent } from "./SearchFoodComponent";
import { EditQuantityComponent } from "./EditQuantityComponent";
import { get } from "http";

const Step = Steps.Step;
// const StepOne = () => (
//     <Fragment>
//         <StepLabel>Choose a Food</StepLabel>
//         <p>Use the search input to look through foods.</p>
//         <SearchFoodComponent />
//     </Fragment>
// );

// const StepTwo = () => (
//     <Fragment>
//         <StepLabel>Edit Quanties</StepLabel>
//         <p>Step 2</p>
//     </Fragment>
// );

class AddFoodComponent extends Component {
    constructor(props) {
        super(props);
        this.unsubscribeFromStore = null;

        this.state = {
            activeStep: 0
        }

        this.steps = [
            {
                title: "Choose a Food",
                content: () => (
                    <SearchFoodComponent />
                )
            }, {
                title: "Edit Quantites",
                content: () => (
                    <EditQuantityComponent />
                )
            }
        ]
    }

    componentDidMount() {
        this.unsubscribeFromStore = store.subscribe(() => {
            let searchedFood = getSelectedFood(store.getState());
            if (searchedFood) {
                this.setState({
                    activeStep: 1
                });
            }
        });

        function getSelectedFood(store) {
            return store.logging.search_food;
        }
    }

    componentWillUnmount() {
        this.unsubscribeFromStore();
    }

    revertActiveStep() {
        this.setState({
            activeStep: 0
        });
    }

    render() {
        let cssClasses = "addFoodComponent__steps addFoodComponent__step--" + this.state.activeStep;

        return (
            
            <div className={cssClasses}>
                {
                    this.state.activeStep === 1 ?

                    <div className="addFoodComponent__buttons">
                        <Button onClick={() => this.revertActiveStep()}>Back to Search</Button>
                    </div>

                    : ""
                }
                <Steps current={this.state.activeStep}>
                    {
                        this.steps.map((step, index) => (
                            <Step key={index} title={step.title}>
                                {step.content}
                            </Step>
                        ))
                    }
                </Steps>
                <Divider />
                <div className="currentStep">
                    {
                        this.steps[this.state.activeStep].content()
                    }
                </div>
            </div>

            
        );
    }
}



export default connect((store) => ({
    logging: store.logging
}))(AddFoodComponent);