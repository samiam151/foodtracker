import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Modal as AntModal } from "antd";
import { hideModal } from "./actions";

const Modal = (props) => {
    let ContentCompoment = props.content;

    return (
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

const mapStateToProps = (state) => ({
    show: state.modal.show,
    content: state.modal.content,
    name: state.modal.name
});
export default connect(mapStateToProps, { hideModal })(Modal);