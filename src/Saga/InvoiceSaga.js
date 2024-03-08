import { takeEvery, call, put, take } from "redux-saga/effects";
import { GET_ALL_INVOICE_API_CALL, GET_ALL_INVOICE_API_RESPONSE, CREATE_INVOICE_API_RESPONSE, CREATE_INVOICE_API_CALL } from "../utils/Constant";
import { GetAllInvoiceRequest, CreateInvoice } from "../Reducer/Action/InvoiceAction";


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
    const response = yield call(CreateInvoice, data.data);
    if(response.status === 200) {
        if (response.data.code === 200){
            yield put({type:CREATE_INVOICE_API_RESPONSE})
        }
    }
       
}

function* InvoiceSaga() {
    yield takeEvery(GET_ALL_INVOICE_API_CALL, getAllInvoiceApiCall)
    yield takeEvery(CREATE_INVOICE_API_CALL, createInvoice)
}

export default InvoiceSaga;