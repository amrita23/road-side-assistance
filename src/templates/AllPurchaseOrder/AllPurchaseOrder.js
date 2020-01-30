import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./AllPurchaseOrder.scss";
import { Link } from "react-router-dom";
import InvoiceContext from "../../Context/invoice/invoiceContext";

const AllPurchaseOrder = () => {
    //----Context//
    const invoiceContext = useContext(InvoiceContext);
    const { allInvoiceList, invoice_list } = invoiceContext;
    const [invoices, setInvoiceList] = useState([]);
    const initialParam =
    {
        sort_by: "invoice_id",
        sort_order: "DESC",
        search_term: "",
        fetch_page: 1,
        per_page: 10
    }
    const [param, setParam] = useState(initialParam);
    const postData = {
        sort_by: param.sort_by,
        sort_order: param.sort_order,
        search_term: param.search_term,
        fetch_page: param.fetch_page,
        per_page: param.per_page
    }

    //get All Invoice List
    useEffect(() => {
        const postData = {
            sort_by: param.sort_by,
            sort_order: param.sort_order,
            search_term: param.search_term,
            fetch_page: param.fetch_page,
            per_page: param.per_page
        }

        allInvoiceList(postData);

    }, [])

    useEffect(() => {
        setInvoiceList(invoice_list);
    }, [invoice_list]);

    const getSingleData = () => {
        allInvoiceList(postData);
    }

    const getAllData = () => {
        allInvoiceList(initialParam);
    }

    return (
        <Fragment>
            <div className="all-orders-list">
                <Row>
                    <Col md={9}>
                        <div className="search-area">
                            <input type="text" className="form-control" onChange={e => setParam({ ...param, search_term: e.target.value })} placeholder="Search" />
                            <button type="button" className="btn btn-danger searchBtn" onClick={getSingleData}><i className="fa fa-search"></i></button>
                            <button type="button" className="btn btn-primary mobile-width" onClick={getAllData}>Reset Search</button>
                        </div>
                    </Col>
                    <Col md={3} className="text-right mt-2 export-area">
                        <Link to="" className="text-danger mr-3 text-right">Export</Link>
                        <i className="fa fa-share text-danger mr-3" aria-hidden="true"></i>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12}>
                        <div className="table-responsive">
                            <table className="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="pretty p-icon p-curve">
                                                <input type="checkbox" />
                                                <div className="state p-danger">
                                                    <i className="icon material-icons">done</i>
                                                    <label>Invoice</label>
                                                </div>
                                            </div>
                                        </th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone Number</th>
                                        <th>Service Type</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th>Data Opened</th>
                                        <th>Dispatching System</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.length > 0 &&
                                        invoices.map((invoice, index) => {
                                            return (
                                                //<Link key={invoice.invoice_id} to={`/invoice-overview/${invoice.invoice_id}`}>
                                                <tr key={invoice.invoice_id}>
                                                    <td>
                                                        <div className="pretty p-icon p-curve">
                                                            <input type="checkbox" />
                                                            <div className="state p-danger">
                                                                <i className="icon material-icons">done</i>
                                                                <label> </label>
                                                            </div>
                                                        </div>
                                                        {invoice.invoice_id}
                                                    </td>
                                                    <td>{invoice.first_name}</td>
                                                    <td>{invoice.last_name}</td>
                                                    <td>{invoice.phone_number}</td>
                                                    <td>{invoice.service_type}</td>
                                                    <td>{invoice.status}</td>
                                                    <td>{invoice.amount}</td>
                                                    <td>{invoice.date_opened_timestamp}</td>
                                                    <td>
                                                        <Button variant={invoice.msa_system === "SYSTEM 1" ? "danger" : "primary"} size="sm"> {invoice.msa_system}</Button>
                                                        &nbsp;&nbsp;<i className="fa fa-pencil fa-lg text-muted pull-right mt-2"></i>
                                                    </td>
                                                </tr>
                                                //</Link>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </Col>
                </Row>

            </div>

        </Fragment>
    )
}
export default AllPurchaseOrder;