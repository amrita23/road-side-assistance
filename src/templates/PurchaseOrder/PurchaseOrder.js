import React, { Fragment, useState, useEffect, useContext } from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import "./PurchaseOrder.scss";
import Input from "../../shareComponents/Input/Input";
import SelectOption from "../../shareComponents/SelectOption/SelectOption";
import { useHistory } from "react-router-dom";
import Map from "../../shareComponents/Map/Map";
import { vehicle_make, vehicle_color, service_type, problem_type, pickup_location } from "../../staticData/static";
import useForm from "../../custom-hooks/FormLogic";

import InvoiceContext from "../../Context/invoice/invoiceContext";
import ModalErrorMsg from "../../shareComponents/ModalErrorMsg/ModalErrorMsg";
import AutoCompleteInput from "../../shareComponents/AutoCompleteInput/AutoCompleteInput";
import InputNumber from "../../shareComponents/InputNumber/InputNumber";
import axios from "axios";

import {
  SERVER_URL
} from "../../Context/Types";

const PurchaseOrder = () => {

  //Calculate Cost
  const calculateCost = async () => {
    const postData = {
      ozip: values.ozip,
      dzip: values.dzip,
      oaddress: values.origin,
      daddress: values.destination,
      servicetype: values.service_type,
      lat: values.origin_lat,
      lng: values.origin_long,
      addlcharges: 0
    }

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await axios.post(`${SERVER_URL}api/order/pricing`, postData, config);
      if (response) {

        let distance = response.data.data.total_miles ? response.data.data.total_miles : "";
        let note = [];

        if (values.is_keys_vehicle === "no") {
          note.push("The customer does not have keys for the vehicle.");
        }
        if (values.neutral === "no") {
          note.push("The vehicle does not go in neutral.");
        }
        if (values.both_front_wheels === "no") {
          note.push("The customer does not have keys for the vehicle.");
        }
        if (values.both_back_wheels === "no") {
          note.push("The customer does not have keys for the vehicle.");
        }

        setValues({
          ...values,
          base_price: response.data.data.base_price,
          amount: response.data.data.net_price,
          total_amount: response.data.data.total_price,
          distance: distance,
          system: response.data.data.system,
          isCalculate: true,
          note: note.join("\n")
        })

      }
    } catch (error) {
      //console.log(error.response.data.errors[0].msg);
      openModal("", error.response.data.errors[0].msg);
    }
  }


  // Error Message Modal 
  const [show, setShow] = useState({ isShown: false, msg: "", isFooter: false, isClose: true, isTowing: false, isChange: false,isSuccess:false });
  
  const openModal = (evt, value) => {
    if (evt) {
      let target = evt.target;
      let selectValue = target.value.trim();
      if (target.name === "will_anyone_vehicle") {
        if (selectValue === "no") {
          setShow({
            ...show,
            isShown: true,
            msg: "Service will not be performed on unattended vehicles.",
            isFooter: false,
            isClose: true
          });
        }
      }
      else if (target.name === "regular_gas_diesel") {
        if (selectValue === "Diesel Gas") {
          setShow({
            ...show,
            isShown: true,
            msg: "Service will not be performed, we cannot service diesel engines.",
            isFooter: false,
            isClose: false
          });
        }
      }
    } else {
      if (value) {
        setShow({
          ...show,
          isShown: true,
          msg: value,
          isFooter: false,
          isClose: true
        });
      }
    }



  }

  const openTowingModal = () => {
    setShow({
      ...show,
      isShown: false,
      isTowing: true,
      isChange: true,
      msg: "Press OK button to convert the service type into Towing!",
      isFooter: true,
      isClose: true

    });
  }

  const closeModal = () => {
    setShow({
      ...show,
      isShown: false,
      isTowing: false,
      msg: "",
      isFooter: false,
      isClose: true
    });
  }

  
  const changeService = () => {
    setValues({ ...values, service_type: "Towing" });
    setShow({
      ...show,
      isShown: false,
      isTowing: false,
    });
  }



  // ---------Calculate Btn Enable and disable When Service Type Change------------------//
  const [enableBtn, setEnble] = useState(false);
  const isEnable = () => {
    if (values.service_type && values.will_anyone_vehicle === "yes" && values.is_keys_vehicle && values.pickup_location && values.origin) {
      if (values.service_type === "Fuel / Fluids" || values.service_type === "Towing") {
        if (values.service_type === "Fuel / Fluids" && values.regular_gas_diesel === "Regular Gas") {
          setEnble(true);
        } else if (values.service_type === "Towing" && values.problem_type && values.neutral && values.four_wheels_turn && values.destination) {
          if (values.four_wheels_turn === "no") {
            if (values.both_front_wheels && values.both_back_wheels) setEnble(true);
            else setEnble(false);
          } else {
            setEnble(true);
          }
        } else {
          setEnble(false);
        }
      } else {
        setEnble(true);
      }
    }
    else {
      setEnble(false);
    }
  }

  //For Route
  const history = useHistory();

  //----Context For Global state(Here Getting Invoice Number)-----------///
  const invoiceContext = useContext(InvoiceContext);
  const { invoice_number, getInvoiceNumber, saveInvoiceDetails, success_invoice } = invoiceContext;

  //------Get Invoice Number (API Call) ----------//
  useEffect(() => {
    getInvoiceNumber();
  }, []);

  //--------Update state After getting invoice number----------///
  useEffect(() => {
    setValues({
      ...values,
      invoice: invoice_number
    });
  }, [invoice_number])

  //Success Message After Save Invoice
  const [succModal, setSuccessModal] = useState(false);
  useEffect(()=>{
    if(success_invoice){
      //openModal("","Done!Payment link has been sent to the entered phone/email. Your customer can pay for the Tow using that.");
      setSuccessModal(true);
    }
  },[success_invoice]);

  const closeSuccModal = () => {
    setSuccessModal(false);
    history.push(`./invoice-overview/${values.invoice}`);
   
  }

  
  const initialData = {
    invoice: "",
    fname: "",
    lname: "",
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
    origin: "",
    origin_lat: "",
    origin_long: "",
    email: "",
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
    system:"",
    isCalculate: false
  }

  //Save Invoice Data
  const sendLink = () => {
    const postData = {
      invoicenumber: values.invoice,
      fname: values.fname,
      lname: values.lname,
      phone: values.phone,
      year: values.year,
      make: values.make,
      model: values.model,
      color: values.color,
      servicetype: values.service_type,
      problemtype: values.problem_type,
      anyonewithvehicle: values.will_anyone_vehicle,
      keysforvehicle: values.is_keys_vehicle,
      fourwheelsturn: values.four_wheels_turn,
      frontwheelsturn: values.both_front_wheels,
      backwheelsturn: values.both_back_wheels,
      neutral: values.neutral,
      fueltype: values.regular_gas_diesel,
      pickuplocation: values.pickup_location,
      pickupnotes: values.pickup_note,
      origin: {
        lat: values.origin_lat,
        lng: values.origin_long
      },
      originaddress: values.origin,
      destination: {},
      destinationaddress: values.destination,
      ozip: values.ozip,
      dzip: values.dzip,
      tmiles: values.distance,
      calculatedcost: values.amount,
      baseprice: values.base_price,
      additionalprice: values.additionalprice,
      paymentemail: values.email,
      paymentamount: values.amount,
      paymenttotalamount: values.total_amount,
      sendpaymentto: values.payLink,
      draft: 0,
      msa_system: values.system,
      paymentnotes: values.note
    }
    if(values.isCalculate === true){
      saveInvoiceDetails(postData);
    }else{
      openModal("","You have not calculated the cost for the service!");
    }
      
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
  } = useForm(initialData, sendLink);

  //------Service Type changes(Calculate Button Diabled or enabled) ------------//
  useEffect(() => {
    isEnable();
  }, [handleChange]);

  //---------AutoComplete Place Search--------------//
  const [places, setSearchPlace] = useState({ field: "", queryResult: "", lat: "", long: "", o_zip: "", d_zip: "" });

  //--------Update State when autocomplete address selected----------// 
  useEffect(() => {
    if (places.field === "origin") {
      setValues({
        ...values,
        [places.field]: places.queryResult,
        origin_lat: places.lat,
        origin_long: places.long,
        ozip: places.o_zip,
      })
    } else {
      setValues({
        ...values,
        [places.field]: places.queryResult,
        dzip: places.d_zip
      })
    }
  }, [places]);

  return (
    <Fragment>
      <div className="invoice-wraper">
        <form onSubmit={handleSubmit} >
          <div className="invoice-id">
            <Input
              type="text"
              name="invoice"
              label="Invoice #"
              value={values.invoice}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly="readOnly"
            />
            {validator.message("invoice", values.invoice, "required", { messages: { required: 'Invoice field is required' } })}
            {touched.invoice && validator.errorMessages.invoice && (
              <p className="error-msg">{validator.errorMessages.invoice}</p>
            )}
          </div>
          <div className="caller-info common-area">
            <Row>
              <Col md={12}>
                <h2 className="text-center">Caller Info</h2>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Input type="text"
                  name="fname"
                  label="First Name*"
                  value={values.fname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {validator.message("fname", values.fname, "required", { messages: { required: 'First Name field is required' } })}
                {touched.fname && validator.errorMessages.fname && (
                  <p className="error-msg">{validator.errorMessages.fname}</p>
                )}
              </Col>
              <Col md={4}>
                <Input type="text"
                  name="lname"
                  label="Last Name*"
                  value={values.lname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {validator.message("lname", values.lname, "required", { messages: { required: 'Last Name field is required' } })}
                {touched.lname && validator.errorMessages.lname && (
                  <p className="error-msg">{validator.errorMessages.lname}</p>
                )}
              </Col>
              <Col md={4}>
                <InputNumber
                  type="text"
                  name="phone"
                  label="Phone Number*"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  format="(###) ###-####"
                />
                {validator.message("phone", values.phone, "required", { messages: { required: 'Phone Number field is required' } })}
                {touched.phone && validator.errorMessages.phone && (
                  <p className="error-msg">{validator.errorMessages.phone}</p>
                )}
              </Col>
            </Row>
          </div>
          <div className="vehicle-info common-area">
            <Row>
              <Col md={12}>
                <h2 className="text-center">Vehicle Info</h2>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Input
                  type="text"
                  name="year"
                  label="Year*"
                  value={values.year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {validator.message("year", values.year, "required", { messages: { required: 'Year field is required' } })}
                {touched.year && validator.errorMessages.year && (
                  <p className="error-msg">{validator.errorMessages.year}</p>
                )}
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
                {validator.message("make", values.make, "required", { messages: { required: 'Vehicle make field is required' } })}
                {touched.make && validator.errorMessages.make && (
                  <p className="error-msg">{validator.errorMessages.make}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Input
                  type="text"
                  name="model"
                  label="Model *"
                  value={values.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {validator.message("model", values.model, "required", { messages: { required: 'Model field is required' } })}
                {touched.model && validator.errorMessages.model && (
                  <p className="error-msg">{validator.errorMessages.model}</p>
                )}
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
                {validator.message("color", values.color, "required", { messages: { required: 'Color field is required' } })}
                {touched.color && validator.errorMessages.color && (
                  <p className="error-msg">{validator.errorMessages.color}</p>
                )}
              </Col>
            </Row>
          </div>
          <div className="service-info common-area">
            <Row>
              <Col md={12}>
                <h2 className="text-center">Service Info</h2>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <SelectOption
                  name="service_type"
                  label="Service Type*"
                  value={values.service_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  option={service_type}
                />
                {validator.message("service_type", values.service_type, "required", { messages: { required: 'Service Type  field is required' } })}
                {touched.service_type && validator.errorMessages.service_type && (
                  <p className="error-msg">{validator.errorMessages.service_type}</p>
                )}
              </Col>
              <Col md={6}>
                <SelectOption
                  name="will_anyone_vehicle"
                  label="Will anyone be the vehicle? *"
                  value={values.will_anyone_vehicle}
                  onChange={e => { openModal(e, ""); handleChange(e) }}
                  onBlur={handleBlur}
                  option={["yes", "no"]}
                />

              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <SelectOption
                  name="is_keys_vehicle"
                  label="Do you have keys for the vehicle? *"
                  value={values.is_keys_vehicle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  option={["yes", "no"]}
                />
              </Col>
              <Col md={6}>
                {values.service_type === "Fuel / Fluids" &&
                  <SelectOption
                    name="regular_gas_diesel"
                    label="Do you need regular gas or diesel? *"
                    value={values.regular_gas_diesel}
                    // onChange={e => { openDieselModal(e); handleChange(e) }}
                    onChange={e => { openModal(e, ""); handleChange(e) }}
                    onBlur={handleBlur}
                    option={["Regular Gas", "Diesel Gas"]}
                  />
                }

                {values.service_type === "Towing" &&
                  <SelectOption
                    name="problem_type"
                    label="Problem Type *"
                    value={values.problem_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    option={problem_type}
                  />
                }

              </Col>
            </Row>
            {values.service_type === "Towing" &&
              <Row>
                <Col md={6}>
                  <SelectOption
                    name="neutral"
                    label="Will the vehicle go in neutral? *"
                    value={values.neutral}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    option={["yes", "no"]}
                  />
                </Col>
                <Col md={6}>
                  <SelectOption
                    name="four_wheels_turn"
                    label="Do all four wheels on the vehicle turn? *"
                    value={values.four_wheels_turn}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    option={["yes", "no"]}
                  />
                </Col>
              </Row>
            }
            {values.service_type === "Towing" && values.four_wheels_turn === "no" &&
              <Row>
                <Col md={6}>
                  <SelectOption
                    name="both_front_wheels"
                    label="Will both front wheels turn? *"
                    value={values.both_front_wheels}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    option={["yes", "no"]}
                  />
                </Col>
                <Col md={6}>
                  <SelectOption
                    name="both_back_wheels"
                    label="Will both back wheels turn? *"
                    value={values.both_back_wheels}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    option={["yes", "no"]}
                  />
                </Col>
              </Row>
            }
          </div>
          <div className="drop-location common-area">
            <Row>
              <Col md={12}>
                <h2 className="text-center">Pickup-Drop Location</h2>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <SelectOption
                  name="pickup_location"
                  label="Pickup Location*"
                  value={values.pickup_location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  option={pickup_location}
                />
              </Col>
              <Col md={6}>
                <Input
                  name="pickup_note"
                  label="Pickup Note *"
                  value={values.pickup_note}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <AutoCompleteInput
                  type="text"
                  name="origin"
                  label="Origin *"
                  value={values.origin}
                  onChange={handleChange}
                  setValues={setSearchPlace}
                />
              </Col>
              {values.service_type === "Towing" &&
                <Col md={6}>
                  <AutoCompleteInput
                    type="text"
                    name="destination"
                    label="Destination *"
                    value={values.destination}
                    onChange={handleChange}
                    setValues={setSearchPlace}
                  />
                </Col>
              }
            </Row>
            <Row>
              <Col md={12}>
                <div className="text-center mt-2">
                  <button type="button" className="btn btn-info btn-lg" disabled={enableBtn === false} onClick={calculateCost}>Calculate Cost</button>
                </div>
              </Col>
            </Row>
            <Row>
              {values.isCalculate &&
                <Col className="text-center mt-2">
                  {values.distance && <h4>Distance: {values.distance} miles</h4>}
                  <h4>Cost : $ {values.amount}</h4>
                  <p>Base Price : $ {values.base_price}</p>
                  <p>Additional Price : </p>
                </Col>
              }

            </Row>
            <Row>
              <Col>
                {(values.origin && values.isCalculate === false) || (values.origin && values.service_type !== "Towing" && values.isCalculate === true) ? <Map origin={values.origin} type="place" /> : ""}
              </Col>
            </Row>
            <Row>
              <Col>
                {values.service_type === "Towing" && values.destination && values.isCalculate === true ?
                  <Map origin={values.origin} destination={values.destination} type="directions" />
                  : ""
                }
              </Col>
            </Row>
          </div>
          <div className="payment-info common-area">
            <Row>
              <Col md={12}>
                <h2 className="text-center">Payment Info</h2>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  type="text"
                  name="email"
                  label="Eamil *"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {validator.message("email", values.email, "required|email", { messages: { required: 'Email field is required' } })}
                {touched.email && validator.errorMessages.email && (
                  <p className="error-msg">{validator.errorMessages.email}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <InputNumber
                  type="text"
                  name="amount"
                  label="Amount($) *"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {validator.message("amount", values.amount, "required", { messages: { required: 'Amount field is required' } })}
                {touched.amount && validator.errorMessages.amount && (
                  <p className="error-msg">{validator.errorMessages.amount}</p>
                )}
              </Col>
              <Col md={6}>
                <Input
                  name="total_amount"
                  label="Total Amount($) *"
                  value={values.total_amount}
                  readOnly="readOnly"
                />
                {validator.message("total_amount", values.email, "required", { messages: { required: 'Total amount field is required' } })}
                {touched.total_amount && validator.errorMessages.total_amount && (
                  <p className="error-msg">{validator.errorMessages.total_amount}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <textarea className="form-control" name="note" onChange={handleChange} onBlur={handleBlur} value={values.note} rows="4">
                </textarea>

              </Col>
            </Row>
            <Row><Col md={12}><p className="text-center mt-3 text-muted">Send payment link to</p></Col></Row>
            <Row>
              <Col md={12}>
                <div className="custom-radio">
                  <div className="custom-input-radio">
                    <input
                      type="radio"
                      name="payLink"
                      id="paytophone"
                      value="Phone"
                      className="control-input"
                      onChange={handleChange}
                      checked={values.payLink === "Phone"}
                    />
                    <label className="custon-label">Phone</label>
                  </div>
                  <div className="custom-input-radio ml-4">
                    <input
                      type="radio"
                      name="payLink"
                      id="paytoemail"
                      value="Email"
                      className="control-input"
                      onChange={handleChange}
                      checked={values.payLink === "Email"}
                    />
                    <label className="custon-label">Email</label>
                  </div>
                </div>
              </Col>

            </Row>
          </div>
          <div className="button-area">
            <Row>
              <Col md={4}>
                <button type="button" className="btn btn-black btn-block"> Save For Later </button>
              </Col>
              <Col md={4}>
                <button type="submit" className="btn btn-info btn-block"> Sent Payment Link </button>
              </Col>
              <Col md={4}>
                <button type="button" className="btn btn-danger btn-block"> Reset</button>
              </Col>
            </Row>
          </div>
        </form>
      </div>

      <ModalErrorMsg
        show={show.isShown} onHide={() => setShow({ ...show, isShown: false })}
        msg={show.msg}
        isFooter={show.isFooter}
        onClick={show.isClose ? closeModal : openTowingModal}

      />

      <ModalErrorMsg
        show={show.isTowing} onHide={() => setShow({ ...show, isTowing: false })}
        msg={show.msg}
        isFooter={show.isFooter}
        onClickClose={closeModal}
        onClickChange={changeService}

      />
     

      {/* --------success modal ------------ */}
      <Modal className="gasModal" show={succModal} onHide={() => setSuccessModal(false)}>
        <Modal.Body>
          <h5 className="text-center mt-3">Done!</h5>
          <p>Payment link has been sent to the entered phone/email. Your customer can pay for the Tow using that.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-sm" onClick={closeSuccModal}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal> 


    </Fragment>
  );
};

export default PurchaseOrder;
