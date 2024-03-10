import { takeEvery, call, put, take } from "redux-saga/effects";
import { GET_ALL_INVOICE_API_CALL, GET_ALL_INVOICE_API_RESPONSE, CREATE_INVOICE_API_RESPONSE, CREATE_INVOICE_API_CALL, GENERATE_INVOICE_PDF_API_CALL, GENERATE_INVOICE_PDF_API_RESPONSE } from "../utils/Constant";
import { GetAllInvoiceRequest, CreateInvoice, GenerateInvoicePdfApi } from "../Reducer/Action/InvoiceAction";


function* getAllInvoiceApiCall() {
    const response = yield call(GetAllInvoiceRequest)

    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({type: GET_ALL_INVOICE_API_RESPONSE, payload: response.data.data})
            }
        }
    }
    catch(error) {

    }
}

function* createInvoice(data) {
    console.log("calling create invoice")
    const response = yield call(CreateInvoice, data.data);
    if(response.status === 200) {
        if (response.data.code === 200){
            yield put({type:CREATE_INVOICE_API_RESPONSE})
        }
    }
       
}

function* generateInvoicePDFApiCall(data) {
    console.log("generate invoice api call", data.invoiceId)
    const response = yield call(GenerateInvoicePdfApi, data.invoiceId)
    console.log(response)
    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({type: GENERATE_INVOICE_PDF_API_RESPONSE, data: response.data.data.fileUrl})
            }
            else {
            }
        }
    }
    catch(error) {

    }
    
}

function* InvoiceSaga() {
    yield takeEvery(GET_ALL_INVOICE_API_CALL, getAllInvoiceApiCall)
    yield takeEvery(CREATE_INVOICE_API_CALL, createInvoice)
    yield takeEvery(GENERATE_INVOICE_PDF_API_CALL, generateInvoicePDFApiCall)
}

export default InvoiceSaga;