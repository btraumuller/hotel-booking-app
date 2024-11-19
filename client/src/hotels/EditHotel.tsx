import {useState, useEffect, useRef} from 'react';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { loadSellerHotel, updateHotel } from '../actions/hotel';
import { matchParams, userObject } from '../types/global';
import { hotel, hotelFormValues } from '../types/hotel';
import HotelForm from "../components/forms/HotelForm";



export default function EditHotel({match}:matchParams){
    const {auth} = useSelector((state:userObject) => ({...state}));
    const [values, setValues] = useState<hotelFormValues>({
        title: "",
        content: "",
        location: "",
        price: "",
        from: "",
        to: "",
        bed: ""
    });

    const [image, setImage] = useState('');

    const [preview, setPreview]=  useState('https://via.placeholder.com/100x100.png?text=PREVIEW');

    const {title, content, location, price} = values;

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
            
            let res:any = await updateHotel(auth.token, match.params.hotelid);
            
            if (!res) {
                throw new Error('Hotel update failed');
            }

            console.log('HOTEL UPDATE RES',res);

            toast.success(`${res.data.title} is updated`);

        }catch(error:any){
            console.log(error);
            toast.error(error.response.data);
        }
        console.log(values);
    }

    const handleImageChange = (e: { target: { files: any[string]; }; }) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(e.target.files[0]);
        //setPreview is a function that takes a URL.createObjectURL(file) as an argument and generates a preview of the image.
        //createObjectURL() method creates a DOMString containing a URL representing the object given in the parameter.
        setPreview(URL.createObjectURL(file));
    }

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setValues({...values, [e.target.name]: e.target.value});    
    }

    let init: React.MutableRefObject<boolean> = useRef(true);

    useEffect(() => {

        if (init.current){

            loadSellerHotel(auth.token, match.params.hotelid).then((res:any) => {
                setValues({...values, ...(res.data as hotelFormValues)});
                setPreview(`${process.env.REACT_APP_Server_API}/hotel/image/${match.params.hotelid}`);
            }).catch((error:any) => {
                console.log(error);
            });

            init.current = false;
        }

    }, [auth.token, match.params.hotelid, values]);

    return(
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>Edit Hotel</h2>
            </div>
            <div className="container-xxl">
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
                            alt="Preview" 
                            className="img img-fluid m-2" />
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                    </div>
                </div>
            </div>
        </>
    )
}
