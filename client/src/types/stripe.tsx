export type PaymentSuccess = {
    data:{
        success: boolean,
    }
}
export type PaymentSettingResponse = {
    data:{
        url: string,
    }
}
export type AccountStatusResponse = {
    data:{}
}
export type ConnectStripeResponse = {
    data:{
        url: string,
    }
}
export type StripeSessionIdResponse = {
    data:{
        sessionId: string
    }
}