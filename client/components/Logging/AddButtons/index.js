import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "antd";
import { addWeightEntry } from "../utils";


const AddButtonsFunction = (props) => {
    const [showWeightModal, setShowWeightModal] = useState(false);
    const [showWorkoutModal, setShowWorkoutModal] = useState(false);

    const handleAddWeight = () => {
        setShowWeightModal(true);
    }
    const onWeightSubmission = (e) => {
        let target = e.target;
        let newWeight = Number(document.querySelector("input#newWeight").value);

        addWeightEntry(props.user.id, newWeight)
            .then(data => {
                setShowWeightModal(false);
            })
            .catch(err => console.log(err));
    }

    const handleAddWorkout = () => {
        setShowWorkoutModal(true);
    }

    return (
        <>
            <Button type="primary" onClick={handleAddWeight}>Add Weight</Button>
            <Button type="primary" onClick={handleAddWorkout}>Add Workout</Button>

            <Modal title="Add Weight Entry"
                visible={showWeightModal}
                onOk={onWeightSubmission}
                onCancel={() => setShowWeightModal(false)}
            >
                <label htmlFor="newWeight">Enter new weight</label>
                <input id="newWeight" type="number" />
            </Modal>
        </>
    );
}

export const AddButtonsComponent = connect((store) => ({
    user: store.user
}))(AddButtonsFunction);
