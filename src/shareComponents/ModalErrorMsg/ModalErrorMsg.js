import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalErrorMsg = (props) => {
    return (
        <Fragment>
            <Modal className="gasModal" show={props.show} onHide={props.onHide}>
                {props.isFooter ?
                    <i className="fa fa-times-circle text-right"></i>
                    :
                    <i className="fa fa-times-circle text-right" onClick={props.onClick}></i>
                }
                <Modal.Body>
                    <p>{props.msg}</p>
                </Modal.Body>
                {props.isFooter &&
                    <Modal.Footer>
                        <Button variant="secondary" className="btn-sm" onClick={props.onClickClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="btn-sm" onClick={props.onClickChange}>
                            ok
                        </Button>
                    </Modal.Footer>
                }

            </Modal>
        </Fragment>
    )
}
export default ModalErrorMsg;