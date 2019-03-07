import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// Uses Harris-Benedict equation, look this up!
// But should use Mifflin-St Jeor equation...
// https://www.omnicalculator.com/health/bmr#how-to-calculate-bmr-the-bmr-formula

class BMRCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feet: null,
            inches: null,
            pounds: null,
            gender: null,
            age: null,
            activityLevel: null
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.calculateBMR();
    }

    handleChange(e) {
        let target = e.target;
        let newState = {
            [target.name]: target.value
        };
        this.setState(Object.assign({}, this.state, newState));
    }

    calculateBMR() {
        const INCHES_TO_CENTIMETERS_QUANTIFIER = 2.54;
        const POUNDS_TO_KILOGRAMS_QUANTIFIER = 2.2;
        const NUM_INCHES_IN_A_FOOT = 12;

        let bmrFinal = null;
        let heightInCentimeters =
            (+this.state.feet * NUM_INCHES_IN_A_FOOT + +this.state.inches) *
            INCHES_TO_CENTIMETERS_QUANTIFIER;
        let weightInKilograms = Number.prototype.toFixed.call(
            +this.state.pounds / POUNDS_TO_KILOGRAMS_QUANTIFIER,
            2
        );

        let genderNeutralBase =
            heightInCentimeters * 6.25 +
            weightInKilograms * 9.99 -
            +this.state.age * 4.92;

        if (this.state.gender === "M") {
            bmrFinal = Math.round(genderNeutralBase + 5);
        } else {
            bmrFinal = Math.round(genderNeutralBase - 161);
        }

        bmrFinal = bmrFinal * +this.state.activityLevel;

        console.log(`${bmrFinal} Kcal`);
        return bmrFinal;
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <h3>Height</h3>
                <label htmlFor="feet">Feet</label>
                <input
                    type="number"
                    name="feet"
                    id="feet"
                    required
                    onChange={e => this.handleChange(e)}
                />
                <label htmlFor="feet">Inches</label>
                <input
                    type="number"
                    name="inches"
                    id="inches"
                    required
                    onChange={e => this.handleChange(e)}
                />

                <h3>Weight</h3>
                <label htmlFor="weight">Pounds</label>
                <input
                    type="number"
                    name="pounds"
                    id="pounds"
                    required
                    onChange={e => this.handleChange(e)}
                />

                <h3>Age</h3>
                <input
                    type="number"
                    name="age"
                    id="age"
                    required
                    onChange={e => this.handleChange(e)}
                />

                <h3>Gender</h3>
                <select
                    required
                    name="gender"
                    id="gender"
                    onChange={e => this.handleChange(e)}>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                </select>

                <h3>Activity Level</h3>
                <select
                    name="activityLevel"
                    id="activityLevel"
                    onChange={e => this.handleChange(e)}>
                    
                    <option value="1.2">Sedentary (little or no exercise)</option>
                    <option value="1.375">
                        Lightly active (light exercise/sports 1-3 days/week)
                    </option>
                    <option value="1.55">
                        Moderatetely active (moderate exercise/sports 3-5 days/week)
                    </option>
                    <option value="1.725">
                        Very active (hard exercise/sports 6-7 days a week)
                    </option>
                    <option value="1.9">
                        Extra active (very hard exercise/sports & physical job or 2x
                        training)
                    </option>
                </select>

                <div>
                    <br />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

