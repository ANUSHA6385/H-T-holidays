import { GET_ALL_RECEIPT_API_RESPONSE } from "../../utils/Constant";

const INITIAL_STATE = {
    listAllReceipt: []
}

const ReceiptReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_RECEIPT_API_RESPONSE: {
            return {...state, listAllReceipt: action.payload}
        }
    }

    return state;
}

export default ReceiptReducer;