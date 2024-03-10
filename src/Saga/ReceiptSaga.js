import { takeEvery, call, put, take } from "redux-saga/effects";
import { GET_ALL_RECEIPT_API_CALL, GET_ALL_RECEIPT_API_RESPONSE } from "../utils/Constant";
import { GetAllReceipt } from "../Reducer/Action/ReceiptActions";


function* callGetALlReceiptApi() {
    const response = yield call(GetAllReceipt)

    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({type: GET_ALL_RECEIPT_API_RESPONSE, payload: response.data.data})
            }
        }
    }
    catch(error) {

    }
}

function* ReceiptSaga() {
    yield takeEvery(GET_ALL_RECEIPT_API_CALL, callGetALlReceiptApi)
}

export default ReceiptSaga;