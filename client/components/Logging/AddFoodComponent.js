import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { Steps, Button, Divider, message } from 'antd';
import { store } from "../../store";
import { SearchFoodComponent } from "./SearchFoodComponent";
import { EditQuantityComponent } from "./EditQuantityComponent";
import ClientFoodUserService from "../../services/ClientFoodUserService";
import { hideModal } from "../Utilites/actions";
import { clearFoodEntry, addToMeals } from "./actions";

const Step = Steps.Step;


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

    submitEntry() {
        let entry = this.props.logging.working_food_entry;
        entry["user_id"] = this.props.user.id;
        entry["calories"] = this.props.logging.working_food.calories * (entry.quantity + entry.quantity_fraction);
        entry["measure"] = this.props.logging.working_food_entry.measure;
        ClientFoodUserService.submitFoodEntry(entry)
            .then(insertedRow => {
                this.props.addToMeals(insertedRow);
            })
            .then(data => {
                this.props.clearFoodEntry();
                this.props.hideModal();
                message.success(`${entry.food_name} has been successdullt added to ${entry.meal_name}`);
            });
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

                <Divider />
                {
                    !this.props.logging.working_food_entry ? <noscript /> :
                    <div className="addFoodComponent__submitButtons">
                        <Button type="primary" onClick={() => this.submitEntry()}>Add Entry</Button>
                    </div>
                }
            </div>

            
        );
    }
}



export default connect((store) => ({
    user: store.user,
    logging: store.logging
}), { hideModal, clearFoodEntry, addToMeals })(AddFoodComponent);