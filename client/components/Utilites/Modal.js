import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import propTypes from "prop-types";

import { hideModal } from "./actions";

const Modal = (props) => {
    let ContentCompoment = props.content;
    return (
        <div className={props.show ? "modal" : "modal modal--hide"}>
            <div className="modal__inner">
                <div className="modal__content">
                    {
                        props.content ? <ContentCompoment /> : <noscript />
                    }
                </div>
            </div>
            <span className="modal__closeButton" onClick={props.hideModal()}>&#10005</span>
        </div>
    )
};

Modal.propTypes = {
    show: propTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    show: state.modal.show,
    content: state.modal.content
});
export default connect(mapStateToProps, (dispatch) => ({
    hideModal: hideModal
}))(Modal);