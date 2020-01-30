import React, { useReducer } from "react";
import axios from "axios";

import {
    INVOICE_NUMBER,
    SAVE_INVOICE,
    INVOICE_DETAILS,
    INVOICE_LIST,
    INVOICE_ERROR,
    SERVER_URL

} from "../Types";

import InvoiceContext from "./invoiceContext";
import InvoiceReducer from "./invoiceReducer";

const InvoiceState = (props) => {
    const initialState = {
        invoice_number: "",
        success_invoice: "",
        invoice_details: "",
        invoice_list: "",
        error: null,
    };

    const SERVER = SERVER_URL;
    const [state, dispatch] = useReducer(InvoiceReducer, initialState);

    const getInvoiceNumber = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await axios.get(`${SERVER}api/order/getInvoiceNumber`, config);
            dispatch({
                type: INVOICE_NUMBER,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: INVOICE_ERROR,
                payload: error.response.data.errors
            })
        }

    }

    const saveInvoiceDetails = async (formData) => {
        const config = {
            headres: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.post(`${SERVER}api/order/saveinvoice`, formData, config)
            dispatch({
                type: SAVE_INVOICE,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: INVOICE_ERROR,
                payload:error.response
            })
        }
    }

    const getInvoiceDetails = async (invoice_id) => {
        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }

        try{
            const response = await axios.get(`${SERVER}api/order/${invoice_id}`,config);
            dispatch({
                type: INVOICE_DETAILS,
                payload: response.data
            })

        }catch(error){
            dispatch({
                type: INVOICE_ERROR,
                payload:error.response
            })
        }
    }

    const allInvoiceList = async (formData) => {
        const config ={
            headres: {
                "Content-Type" : "application/json"
            }
        }

        try{
            const response = await axios.post(`${SERVER}api/order`, formData, config);
            dispatch({
                type: INVOICE_LIST,
                payload: response.data
            })

        }catch(error){
            dispatch({
                type: INVOICE_ERROR,
                payload:error.response
            })
        }
    }

    return <InvoiceContext.Provider
        value={{
            invoice_number: state.invoice_number,
            success_invoice: state.success_invoice,
            invoice_details: state.invoice_details,
            invoice_list: state.invoice_list,
            error: state.error,
            getInvoiceNumber,
            saveInvoiceDetails,
            getInvoiceDetails,
            allInvoiceList
        }}
    >
        {props.children}
    </InvoiceContext.Provider>
}

export default InvoiceState;