import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, message } from "antd";
import { addWeightEntry, addWorkoutEntry } from "../utils";
import { addToWorkouts } from "../../Logging/actions";


const AddButtonsFunction = (props) => {
    const [showWeightModal, setShowWeightModal] = useState(false);
    const [showWorkoutModal, setShowWorkoutModal] = useState(false);

    let weightInput = React.createRef(),
        workoutInput = React.createRef();

    const handleAddWeight = () => {
        setShowWeightModal(true);
    }

    const handleAddWorkout = () => {
        setShowWorkoutModal(true);
    }

    const onWeightSubmission = (e) => {
        let target = e.target;
        let newWeight = Number(weightInput.current.value);

        addWeightEntry(props.user.id, newWeight, props.current_date)
            .then(data => {
                setShowWeightModal(false);
            })
            .catch(err => console.log(err));
    }

    const onWorkoutSubmission = (e) => {
        let target = e.target;
        let newWorkout = Number(workoutInput.current.value);

        addWorkoutEntry(props.user.id, newWorkout, props.current_date)
            .then(data => {
                console.log(data);
                props.addToWorkouts(data);
            })
            .then(() => {
                setShowWorkoutModal(false);
                message.success("New workout calories added!");
            })
            .catch(err => console.log(err));
    };

    return (
        <Fragment>
            <Button type="primary" onClick={handleAddWeight}>Add Weight</Button>
            <Button type="primary" onClick={handleAddWorkout}>Add Workout</Button>

            <Modal title="Add Weight Entry"
                visible={showWeightModal}
                onOk={onWeightSubmission}
                onCancel={() => setShowWeightModal(false)}
            >
                <label htmlFor="newWeight">Enter new weight</label>
                <input id="newWeight" type="number" ref={weightInput} />
            </Modal>

            <Modal title="Add Workout Entry"
                visible={showWorkoutModal}
                onOk={onWorkoutSubmission}
                onCancel={() => setShowWorkoutModal(false)}
            >
                <label htmlFor="newWorkout">Enter calories burned from workout</label>
                <input id="newWorkout" type="number" min={0} ref={workoutInput} />
            </Modal>
        </Fragment>
    );
}

export const AddButtonsComponent = connect((store) => ({
    user: store.user,
    current_date: store.logging.date
}), { addToWorkouts })(AddButtonsFunction);
