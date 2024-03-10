import { act } from "react-dom/test-utils";
import {
  GET_ALL_INVOICE_API_RESPONSE,
  RESET_INVOICE_ARRAY,
  GENERATE_INVOICE_PDF_API_RESPONSE,
  RESET_INVOICE_CODE
} from "../../utils/Constant";
const INITIAL_STATE = {
  invoiceList: [],
  paidAmount: 0,
  unpaidAmount: 0,
  totalAmount: 0,
  totalOrders: 0,
  fileurl: '',
  code: 0
};

const InvoiceReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case GET_ALL_INVOICE_API_RESPONSE: {
      return { ...state, invoiceList: action.payload.invoiceList, paidAmount: action.payload.paidAmount, unpaidAmount: action.payload.unPaidAmount, totalAmount: action.payload.totalAmount, totalOrders: action.payload.totalOrder};
    }
      
    case RESET_INVOICE_ARRAY: 
      return { ...state, listInvoice: [] };

    case GENERATE_INVOICE_PDF_API_RESPONSE: 
      console.log("executn ghte case")
      console.log(action.payload)
        return {...state, fileurl: action.data, code: 100}
    
    
    case RESET_INVOICE_CODE: {
      return {...state, code: 0}
    }
  }
  return state;
};

export default InvoiceReducer;
