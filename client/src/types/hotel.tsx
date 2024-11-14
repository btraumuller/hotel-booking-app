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