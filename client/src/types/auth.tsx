export type registerType = {
    name: string,
    email: string,
    password: string
}
export type registerProps = {
    name: string,
    setName: (name:string) => void,
    email: string,
    setEmail: (email:string) => void,
    password: string,
    setPassword: (password:string) => void,
    handleSubmit: (e:any) => void
}
export type returnPromise = {
    "ok": boolean,
}
export type loginUser = {
    email: string,
    password: string
}

export type nextType = {
    (user:any):void
}

export type loginProps = {
    email: string,
    setEmail: (email:string) => void,
    password: string,
    setPassword: (password:string) => void,
    handleSubmit: (e:any) => void
}
export type LoginUserData = {
    token: string,
    user: {
        _id: string,
        name: string,
        email: string,
        stripe_account_id: string,
        stripe_seller: {},
        stripeSession: {},
        createdAt: string,
        updatedAt: string
    }
}

export type LoginApiResponse = {
    status: number,
    message: string,
    data: LoginUserData
}