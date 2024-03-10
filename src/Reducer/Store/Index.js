import { combineReducers } from "redux";
import UserReducer from './UserReducer';
import CustomersReducer  from "./CustomersReducer";
import ProductReducer from "./ProductReducer";
import MasterReducer from "./MasterReducer";
import PurchaseOrderReducer from "./PurchaseOrderReducer";
import InvoiceReducer from "./InvoiceReducer";
import ReceiptReducer from "./ReceiptReducer";

const RootReducer = combineReducers({
    users: UserReducer,
    customers: CustomersReducer,
    masterData: MasterReducer,
    productsData: ProductReducer,
    purchaseOrder: PurchaseOrderReducer,
    invoice: InvoiceReducer,
    receipt: ReceiptReducer
})

export default RootReducer;