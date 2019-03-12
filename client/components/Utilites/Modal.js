import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import propTypes from "prop-types";

import { Modal as AntModal } from "antd";

import { hideModal } from "./actions";

const Modal = (props) => {
    let ContentCompoment = props.content;

    return (
        /* <div className={props.show ? "modal" : "modal modal--hide"}>
            <div className="modal__inner">
                <div className="modal__content">
                    {
                        props.content ? <ContentCompoment /> : <noscript />
                    }
                </div>
                <span className="modal__closeButton" onClick={props.hideModal}>x</span>
            </div>
        </div>  */
        <div className="modal">
            <AntModal visible={props.show} onCancel={props.hideModal} onOk={props.hideModal} footer={null}>
                <div className="modal__inner">
                    <div className="modal__content">
                        {
                            props.content ? <ContentCompoment /> : <noscript />
                        }
                    </div>
                    
                </div>
            </AntModal>
        </div>
    )
};


// Modal.propTypes = {
//     show: propTypes.bool.isRequired
// }
const mapStateToProps = (state) => ({
    show: state.modal.show,
    content: state.modal.content,
    name: state.modal.name
});
export default connect(mapStateToProps, { hideModal })(Modal);