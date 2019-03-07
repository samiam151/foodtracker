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
        // let iuser = localStorage.getItem("food_tracker_user");
        // if (iuser) {
            fetch("/api/initlogin", {
                method: "POST",
                "credentials": "include",
                headers: {
                    "content-type": "application/json",
                }
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                store.dispatch({
                    payload: {
                        ...data,
                        "isAuthenticated": true
                    }, 
                    type: "USER__UPDATE"
                });
                
            })
            .then(() => {
                this.showContent();
            })
            .catch(err => {
                console.log(err);
            })
            
        // } else {
        //     this.showContent();
        // }
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