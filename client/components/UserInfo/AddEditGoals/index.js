import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, message } from "antd";
import { setUser } from "../../Login/actions";
import ClientUserService from "../../../services/ClientUserService";

const AddEditGoals = ({user, ...props}) => {

    const [newGoals, setNewGoals] = useState({});

    useEffect(() => {
        setNewGoals({
            "target_weight": Number.parseFloat(user.target_weight || user.current_weight),
            "target_weekly_loss": Number.parseFloat(user.target_weekly_loss || 0)
        })
    }, [user])

    const handleChange = (e) => {
        let target = e.target;
        setNewGoals({
            ...newGoals,
            [target.name]: Number.parseFloat(target.value)
        });
    }

    const updateGoals = (e) => {
        e.preventDefault();
        ClientUserService.updateGoals(
            user.id,
            newGoals['target_weight'],
            newGoals['target_weekly_loss']
        )
            .then(data => {
                props.setUser(data);
                message.success("Your goals have been updated!");
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="addEditGoals">
            <h3>Add and Edit Goals</h3>
            <form onSubmit={updateGoals}>
                <div className="input-container input-container--half">
                    <label htmlFor="">Target Weight</label>
                    <p className="input-container--info">Indicate the weight you plan to obtain.</p>
                    <input type="number" step="0.25" name="target_weight" defaultValue={user.target_weight || user.current_weight} onChange={handleChange} />
                </div>

                <div className="input-container input-container--half">
                    <label htmlFor="">Target Weekly Loss</label>
                    <p className="input-container--info">Weight fluctuation of more than 2 pounds a week are unadvised. Positive numbers indicate a weight loss, neagtive numbers indicated weight gain.</p>
                    <input min="-2.0" max="2.0" step="0.25" type="number" name="target_weekly_loss" defaultValue={user.target_weekly_loss || 0} onChange={handleChange} />
                </div>

                <div className="input-container input-container--half">
                    <Button type="primary" htmlType="submit">Update Goals</Button>
                </div>
            </form>
        </div>

        
    );
}

export const AddEditGoalsComponent = connect((store) => ({
    user: store.user
}), { setUser })(AddEditGoals);