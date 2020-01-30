import{
    INVOICE_NUMBER,
    SAVE_INVOICE,
    INVOICE_DETAILS,
    INVOICE_LIST,
    INVOICE_ERROR
} from "../Types";

export default (state, action) => {
    switch (action.type){
        case INVOICE_NUMBER:
            return{
                ...state,
                invoice_number: action.payload.data.invoice_id
            };
        case SAVE_INVOICE:
            return {
                ...state,
                success_invoice : action.payload.data.msg
            }
        case INVOICE_ERROR:
            return {
                ...state,
                success: null,
                error: action.payload
            }
        case INVOICE_DETAILS:
            return {
                ...state,
                invoice_details: action.payload.data.invoice
            }
        case INVOICE_LIST:
            return {
                ...state,
                invoice_list: action.payload.data.invoices
            }
        default:
            return state;
    }
}