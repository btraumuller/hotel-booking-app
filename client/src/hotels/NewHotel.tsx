
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addHotel } from "../actions/hotel";
import { UserObject } from "../types/global";
import HotelForm from "../components/forms/HotelForm";

function NewHotel(){

    const [values, setValues] = useState({
        title: "",
        content: "",
        location: "",
        image: "",
        price: "",
        from: "",
        to: "",
        bed: ""
    });

    const [preview, setPreview]=  useState('https://via.placeholder.com/100x100.png?text=PREVIEW');

    const {title, content, image, location, price} = values;
    
    const {auth} = useSelector((state:UserObject) => ({...state}));
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        let hotelData = new FormData();
        hotelData.append("title", title);
        hotelData.append("content", content);
        hotelData.append("location", location);
        hotelData.append("price", price);
        image && hotelData.append("image", image);
        hotelData.append("bed", values.bed);
        hotelData.append("from", values.from);
        hotelData.append("to", values.to);

        try{
            let res = await addHotel(auth.token, hotelData);
            
            if (!res) {
                throw new Error('Hotel posting failed');
            }

            toast.success('New hotel is posted');
            document.querySelector('form')?.reset();
            
        }catch(error:any){
            console.log(error);
            toast.error(error.response.data);
        }
    }

    const handleImageChange = (e: { target: { files: any[string]; }; }) => {
        const file = e.target.files ? e.target.files[0] : null;
        setValues({...values, image: file});
        //setPreview is a function that takes a URL.createObjectURL(file) as an argument and generates a preview of the image.
        //createObjectURL() method creates a DOMString containing a URL representing the object given in the parameter.
        setPreview(URL.createObjectURL(file));
    }

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setValues({...values, [e.target.name]: e.target.value});    
    }

    
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>Add Hotel</h1>
            </div>
            <div className="container-xl">
                <div className="row">
                    <div className="col-md-10">
                        <HotelForm 
                            handleChange={handleChange}
                            handleImageChange={handleImageChange}
                            handleSubmit={handleSubmit}
                            setValues={setValues}
                            values={values} />
                    </div>
                    <div className="col-md-2">
                        <img 
                            src={preview} 
                            alt="preview_image" 
                            className="img img-fluid m-2" />
                        <pre>{JSON.stringify(values)}</pre>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewHotel;