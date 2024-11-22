export type paymentSuccess = {
    data:{
        success: boolean,
    }
}
export type paymentSettingResponse = {
    data:{
        url: string,
    }
}
export type accountStatusResponse = {
    data:{}
}
export type connectStripeResponse = {
    data:{
        url: string,
    }
}