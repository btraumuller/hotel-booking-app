export type matchParams = {
    match:{
        params:{
            hotelid: string
        }
    }
}
export type currencyObject = {
    amount: number,
    currency: string
}
export interface userObject {
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