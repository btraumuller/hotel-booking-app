export type MatchParams = {
    match:{
        params:{
            hotelid: string
        }
    }
}
export type CurrencyObject = {
    amount: number,
    currency: string
}
export interface UserObject {
    auth:{
        token: string,
        user: {
            _id: string,
            name: string,
            email: string,
            createdAt: string
            updatedAt: string,
            stripe_account_id: string,
            stripe_seller: {
                charges_enabled: boolean
            },
            stripeSession: {}
        }
    }
}
export type ErrorObject = {
    message: string
}