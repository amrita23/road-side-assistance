import React, { Fragment, useEffect, useContext } from "react";
import "./InvoiceOverview.scss";
import { Row, Col } from "react-bootstrap";
import Input from "../../shareComponents/Input/Input";
import SelectOption from "../../shareComponents/SelectOption/SelectOption";
import { Link, useParams } from "react-router-dom";
import useForm from "../../custom-hooks/FormLogic";
import InvoiceContext from "../../Context/invoice/invoiceContext";
import { vehicle_make, vehicle_color, service_type, problem_type, pickup_location } from "../../staticData/static";
import InputNumber from "../../shareComponents/InputNumber/InputNumber";

const InvoiceOverview = () => {

    //----Context For Global state(Here Getting Invoice Number)-----------///
    const invoiceContext = useContext(InvoiceContext);
    const { getInvoiceDetails, invoice_details } = invoiceContext;
    let { invoice_id } = useParams();



    const updateInvoiceData = () => {
        console.log("update");
    }

    const initialData = {
        invoice_id: "",
        first_name: "",
        last_name: "",
        phone: "",
        year: "",
        make: "",
        model: "",
        color: "",
        service_type: "",
        will_anyone_vehicle: "",
        is_keys_vehicle: "",
        pickup_location: "",
        pickup_note: "",
        start_address: "",
        origin_lat: "",
        origin_long: "",
        payment_email: "",
        amount: "",
        total_amount: "",
        note: "",
        four_wheels_turn: "",
        regular_gas_diesel: "",
        problem_type: "",
        neutral: "",
        destination: "",
        both_front_wheels: "",
        both_back_wheels: "",
        distance: "",
        base_price: "",
        ozip: "",
        dzip: "",
        payLink: "Phone",
        additionalprice: 0,
        isCalculate: false,
        date_opened_timestamp: "",
        date_first_link_send: "",
        data_last_link_send: ""
    }

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setValues,
        touched,
        validator,
        error
    } = useForm(initialData, updateInvoiceData);


    useEffect(() => {
        getInvoiceDetails(invoice_id)
    }, [invoice_id]);

    //--------Update state After getting invoice number----------///
    useEffect(() => {
        setValues(invoice_details);
    }, [invoice_details])

    return (
        <Fragment>
            <div className="overview-wraper">
                <Row>
                    <Col>
                        <div className="alert alert-danger" role="alert">
                            Submit this purchase order into {values.msa_system}
                        </div>
                    </Col>
                </Row>

                <div className="payment-area common-area">
                    <Row>
                        <Col>
                            <h2 className="text-center">Invoice Overview</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/all-purchase-orders" className="pull-right"><i className="fa fa-file-text-o"></i> &nbsp;Back to all purchase orders</Link>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={4}>
                            <Input
                                type="text"
                                name="invoice_id"
                                label="Invoice*"
                                value={values.invoice_id || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly="readOnly"
                            />
                        </Col>
                        <Col md={4}>
                            <SelectOption
                                name="status"
                                label="Satus *"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                option={["Yet_to_pay", "Visited", "Paid", "Dispatched"]}
                            />
                        </Col>
                        <Col md={4}>
                            <Input 
                                type="text"
                                name="amount"
                                label="Amount($) *"
                                value={values.amount || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="info-area common-area">
                    <Row>
                        <Col>
                            <h2 className="text-center">Contact Information</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Input
                                type="text"
                                name="first_name"
                                label="First Name*"
                                value={values.first_name || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Col>
                        <Col md={6}>
                            <Input type="text"
                                name="last_name"
                                label="Last Name*"
                                value={values.last_name || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <InputNumber
                                type="text"
                                name="phone_number"
                                label="Phone Number*"
                                value={values.phone_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                format="(###) ###-####"
                            />
                        </Col>
                        <Col md={6}>
                            <Input
                                name="payment_email"
                                label="Eamil *"
                                value={values.payment_email || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={12}>
                            <div className="custom-radio">
                                <div className="custom-input-radio">
                                    <input
                                        type="radio"
                                        name="send_payment_to"
                                        id="paytophone"
                                        value="Phone"
                                        className="control-input"
                                        onChange={handleChange}
                                        checked={values.send_payment_to === "Phone"}
                                    />
                                    <label className="custon-label">Phone</label>
                                </div>
                                <div className="custom-input-radio">
                                    <input
                                        type="radio"
                                        name="send_payment_to"
                                        id="paytoemail"
                                        value="Email"
                                        className="control-input"
                                        onChange={handleChange}
                                        checked={values.send_payment_to === "Email"}
                                    />
                                    <label className="custon-label">Email</label>
                                </div>
                            </div>
                        </Col>

                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <div className="button-resend">
                                <button type="button" className="btn btn-info custom-btn-width">Resend Receipt</button>
                                <button type="button" className="btn btn-danger custom-btn-width">Resend Pay Link</button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="vehicle-area common-area">
                    <Row>
                        <Col md={12}>
                            <h2 className="text-center">Vehicle Info</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Input type="text"
                                name="year"
                                label="Year*"
                                value={values.year || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Col>
                        <Col md={6}>
                            <SelectOption
                                name="make"
                                label="Make *"
                                value={values.make}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                option={vehicle_make}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Input type="text"
                                name="model"
                                label="Model *"
                                value={values.model || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Col>
                        <Col md={6}>
                            <SelectOption
                                name="color"
                                label="Color *"
                                value={values.color}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                option={vehicle_color}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="service-area common-area">
                    <Row>
                        <Col md={12}>
                            <h2 className="text-center">Service Info</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SelectOption
                                name="service-type"
                                label="Service Type*"
                                value={values.service_type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                option={service_type}
                                readOnly="readOnly"
                            />
                        </Col>
                        <Col md={6}>
                            <SelectOption
                                name="anyone-vehicle"
                                label="Will anyone be the vehicle? *"
                                value={values.anyone_with_vehicle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                option={["yes", "no"]}
                                readOnly="readOnly"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SelectOption
                                name="is-keys"
                                label="Do you have keys for the vehicle? *"
                                value={values.keys_for_vehicle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                option={["yes", "no"]}
                                readOnly="readOnly"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="location-area common-area">
                    <Row>
                        <Col md={12}>
                            <h2 className="text-center">Location Information</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SelectOption
                                name="pickup-location"
                                label="Pickup Location*"
                                value={values.pickup_location}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                option={pickup_location}
                            />
                        </Col>
                        <Col md={6}>
                            <Input
                                name="pickup-note"
                                label="Pickup Note *"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Input
                                name="start_address"
                                label="Origin *"
                                value={values.start_address || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly="readOnly"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <textarea className="form-control" value={values.pickup_notes} rows="4"></textarea>
                        </Col>
                    </Row>
                </div>
                <div className="time-area common-area">
                    <Row>
                        <Col md={12}>
                            <h2 className="text-center">Time Stamps</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Input
                                type="text"
                                name="date_opened_timestamp"
                                label="Date Opened *"
                                value={values.date_opened_timestamp || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly="readOnly"

                            />
                        </Col>
                        <Col md={6}>
                            <Input
                                type="text"
                                name="time_of_payment"
                                label="Time Of Payment*"
                                value={values.date_opened_timestamp || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly="readOnly"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Input type="text"
                                name="date_first_link_send"
                                label="First Time Payment Link Was Sent *"
                                value={values.date_first_link_send || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly="readOnly"
                            />
                        </Col>
                        <Col md={6}>
                            <Input
                                name="data_last_link_send"
                                label="Last Time Payment Link Was Sent *"
                                value={values.data_last_link_send || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly="readOnly"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="text-center">
                            <button type="submit" className="btn btn-info btn-lg custom-btn-width">Save</button>
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    );
}

export default InvoiceOverview;