import React, { Component, Fragment } from "react";
import { store } from "../../store";
import { Loader } from "./Loader";
import axios from "axios";

export class InitialAuthComponent extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        axios.post("/api/initlogin")
        .then(res => {
            let user = res.data.user_goals,
                workouts = res.data.workouts;
            // Set users
            if (user !== undefined && user.id !== undefined) {
                store.dispatch({
                    payload: {
                        ...user,
                        "isAuthenticated": true
                    }, 
                    type: "SET_USER"
                });
            }

            // Set workouts
            if (workouts) {
                store.dispatch({
                    type: "SET_WORKOUTS",
                    payload: { ...workouts }
                });
            }

        })
        .then(() => {
            this.showContent();
        })
        .catch(err => {
            console.log(err);
        })
    }

    showContent() {
        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 250);
    }

    render() {
        return (
            this.state.loaded ? this.props.children : <Loader />
        )
    }
};