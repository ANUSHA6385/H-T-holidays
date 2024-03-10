import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllReceipt = () => {
    return AxiosConfig.post('/v2/payment/getAllReceipts')
}