import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import Input from "../../shareComponents/Input/Input";

const EditAccount = () => {
    return (
        <Fragment>

            <div className="edit-account mt-3">
                <Row>
                    <Col md={6}>
                        <Input type="text"
                            name="fname"
                            label="First Name*"
                        />
                    </Col>
                    <Col md={6}>
                        <Input type="text"
                            name="lname"
                            label="Last Name*"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Input type="text"
                            name="email"
                            label="Eamil*"
                        />
                    </Col>
                    <Col md={6}>
                        <Input type="text"
                            name="phone"
                            label="Phone *"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Input type="text"
                            name="email"
                            label="Password*"
                        />
                    </Col>
                    <Col md={6}>
                        <Input type="text"
                            name="confirm_password"
                            label="Confirm Password *"
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <button type="submit" className="btn btn-danger custom-btn-width">Submit</button>
                    </Col>
                </Row>
            </div>


        </Fragment>
    )
}
export default EditAccount;