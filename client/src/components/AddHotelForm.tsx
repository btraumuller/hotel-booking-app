import { DatePicker, Select } from 'antd';
const {Option} = Select;

type hotelFormType = {
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

export function hotelForm({handleSubmit, handleChange, handleImageChange, values, setValues}:hotelFormType) {
    
    const {title, content, price, location} = values;
    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="image" className="btn btn-outline-secondary pointer btn-block mt-4 mb-4 text-left">
                    <input 
                        type="file" 
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="pointer"
                        />
                </label>
                <br />
                <label htmlFor="title" className="form-label">Title</label>
                <input  
                    type="text" 
                    name="title" 
                    className="form-control" 
                    value={title} 
                    onChange={handleChange} />
                <label htmlFor="location" className="form-label">Location</label>
                <input  
                    type="text" 
                    name="location" 
                    className="form-control" 
                    value={location} 
                    onChange={handleChange} />
                <label htmlFor="content" className="form-label mt-2">Content</label>
                <textarea 
                    name="content" 
                    className="form-control" 
                    value={content} 
                    onChange={handleChange} />
                <label htmlFor="price" className="form-label mt-2">Price</label>
                <input  
                    type="number" 
                    name="price" 
                    className="form-control" 
                    placeholder="price"
                    value={price} 
                    onChange={handleChange} />
                <label htmlFor="bed" className="form-label mt-2">Bed</label>
                <Select onChange={(value) => setValues({...values, bed:value})} className="w-100" size="large">
                    <Option key="1">1</Option>
                    <Option key="2">2</Option>
                    <Option key="3">3</Option>
                    <Option key="4">4</Option>
                </Select>
                
                <DatePicker 
                    placeholder="From date" 
                    className="form-control mt-4" 
                    onChange={(date,dateString) => setValues({...values, from: dateString.toLocaleString()})} 
                    disabledDate={(current) => current && current.valueOf() < Date.now() - 86400000}
                    />
                <DatePicker 
                    placeholder="To date" 
                    className="form-control mt-4" 
                    onChange={(date,dateString) => setValues({...values, to: dateString.toLocaleString()})}
                    disabledDate={(current) => current && current.valueOf() < Date.now() - 86400000}
                    />
                <button className="btn btn-outline-primary m-2">Save</button>
            </div>
    </form>
    )
}
export default hotelForm;