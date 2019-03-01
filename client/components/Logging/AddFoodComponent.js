import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { Stepper, Step, StepLabel } from "@material-ui/core"; 

import { SearchFoodComponent } from "./SearchFoodComponent";

class AddFoodComponent extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <Stepper>
                <Step key={1} className="addFood__step">
                    <StepLabel>Choose a Food</StepLabel>
                    <p>Use the search input to look through foods.</p>
                    
                    <SearchFoodComponent />
                </Step>
                <Step key={2}>
                    <StepLabel>Edit Quanties</StepLabel>
                    Step 2
                </Step>
            </Stepper>
        );
    }
}



export default connect((store) => ({
    logging: store.logging
}))(AddFoodComponent);