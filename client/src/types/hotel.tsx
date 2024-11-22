export type hotelFormValues = {
    title: string,
    content: string,
    location: string,
    price: string,
    from: string,
    to: string,
    bed: string
}
export type hotelFormType = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
        title: string,
        content: string,
        location: string,
        price: string,
        from: string,
        to: string,
        bed: string
    },
    setValues: (values: any) => void,
}

export type hotel = {
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

export type valueResponse = {
    data: hotelFormValues
}
export type hotelResponse = {
    data: hotel[]
};

export type bookingHotelResponse = {
    data: bookingHotel[]
}

export type hotelFormArray = {
    data: hotelFormValues[]
}

export type hotelQuery = { 
    location?: string | undefined,
    date?: string | undefined,
    bed?: string | undefined
}

export type bookingHotel = {
    _id: string,
    hotel: hotel,
    session: string,
    orderedBy: string
}