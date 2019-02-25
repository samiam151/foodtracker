import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { store } from "../../store";
import {  } from 'react-router'

export class InitialAuthComponent extends Component {
    constructor(props) { super(props); }

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
                console.log(data);
                let username = data;
                store.dispatch({
                    payload: {
                        name: username
                    }, 
                    type: "USER__UPDATE"});
                
            });
            
        }
    }

    render() {
        return( this.props.children );
    }
};