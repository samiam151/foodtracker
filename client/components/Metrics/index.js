import React, { useState, useEffect } from "react";
import { calculateBMR } from "../SignUp/UpdateGoals/utils";
import { Loader } from "../Utilites/Loader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setUser } from "../Login/actions";

const MetricsFunction = ({user, ...props}) => {
    const [calculated, setCalculated] = useState(false);

    useEffect(() => {
        if (!user.isAuthenticated) {
            setCalculated(true);
        }

        let feet = Math.floor(user.height_inches / 12);
        let inches = user.height_inches % 12;
        let age = calculateAge(user.birthday, Date.now());
        let gender = user.isFemale ? "F" : "M";

        try {
            let bmr = calculateBMR(feet, inches, user.current_weight, age, gender, user.activity_level);
            props.setUser({
                bmr: bmr
            });
            setCalculated(true);
        }
        catch(err) {
            console.log(err);
            setCalculated(true);
        }
    }, []);

    return calculated ? props.children : <Loader />;
};

function calculateAge(date1, date2) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    let inDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    return Math.floor(inDays / 365);
}

export const MetricsComponent = withRouter(connect((store) => ({
    user: store.user
}), { setUser })(MetricsFunction));