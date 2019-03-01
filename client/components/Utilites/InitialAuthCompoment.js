import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { store } from "../../store";
import {  } from 'react-router'
import { Loader } from "./Loader";

export class InitialAuthComponent extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        let iuser = localStorage.getItem("food_tracker_user");
        if (iuser) {
            fetch("/api/initlogin", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                "body": iuser
            })
            .then(res => res.json())
            .then(data => {
                store.dispatch({
                    payload: data, 
                    type: "USER__UPDATE"
                });
                
            })
            .then(() => {
                this.showContent();
            });
            
        } else {
            this.showContent();
        }
    }

    showContent() {
        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 500);
    }

    render() {
        return (
            this.state.loaded ? this.props.children : <Loader />
        )
    }
};