import React from "react";

export const UpdateBodyInformation = ({setSignupProperty, ...props}) => {

    const handleChange = (e) => {
        let target = e.target;
        setSignupProperty(target.name, target.value);
    }

    return (
        <div className="signup__goalsInfo">
            <div className="signup__inputContainer signup__inputContainer--height">
                <label>Height</label>

                <input
                    type="number"
                    name="feet"
                    id="feet"
                    min="0"
                    max="12"
                    required
                    placeholder="Feet"
                    onChange={handleChange}
                />              

                <input
                    type="number"
                    name="inches"
                    id="inches"
                    min="0"
                    max="11"
                    required
                    placeholder="Inches"
                    onChange={handleChange}
                />
                
            </div>

            <div className="signup__inputContainer">
                <label htmlFor="weight">Weight</label>
                <input
                    type="number"
                    name="pounds"
                    id="pounds"
                    required
                    placeholder="Pounds (lbs)"
                    onChange={handleChange}
                />
            </div>

            <div className="signup__inputContainer">
                <label>Gender</label>
                <select
                    required
                    name="gender"
                    id="gender"
                    onChange={handleChange}>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                </select>
            </div>

            <div className="signup__inputContainer">
                <label htmlFor="">Activity Level</label>
                <select
                    name="activityLevel"
                    id="activityLevel"
                    onChange={e => handleChange(e)}>
                    
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
            </div>
        </div>
    );
}