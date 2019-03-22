import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { store } from "../../store";
import {  } from 'react-router'
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
            let data = res.data;
            console.log(data);
            if (data) {
                store.dispatch({
                    payload: {
                        ...data,
                        "isAuthenticated": true
                    }, 
                    type: "SET_USER"
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