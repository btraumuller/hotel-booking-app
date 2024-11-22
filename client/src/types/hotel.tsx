export type HotelFormValues = {
    title: string,
    content: string,
    location: string,
    price: string,
    from: string,
    to: string,
    bed: string
}
export type HotelFormType = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: HotelFormValues,
    setValues: (values: any) => void,
}

export type Hotel = {
    _id: string,
    title: string,
    content: string,
    location: string,
    price: string,
    postedBy: {
        _id: string,
        name: string,
    },
    image: {
        url: string,
        public_id: string,
        contentType: string
    },
    from: string,
    to: string,
    bed: string
}

export type ValueResponse = {
    data: HotelFormValues
}
export type HotelResponse = {
    data: Hotel[]
};

export type BookingHotelResponse = {
    data: BookingHotel[]
}

export type HotelFormArray = {
    data: HotelFormValues[]
}

export type HotelQuery = { 
    location?: string | undefined,
    date?: string | undefined,
    bed?: string | undefined
}

export type BookingHotel = {
    _id: string,
    hotel: Hotel,
    session: string,
    orderedBy: string
}