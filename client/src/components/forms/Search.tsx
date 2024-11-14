import {DatePicker, Select} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState} from 'react';
import {useHistory} from 'react-router-dom';

const {Option} = Select;
const {RangePicker} = DatePicker;
export default function Search(){
    const [location, setLocation] = useState("");
    const [date, setDate] = useState<string[]>([]);
    const [bed, setBed] = useState("");
    const history = useHistory();

    const handleSubmit = () => {
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
    }

    return(
        <div className="d-flex pb-4">
            <div className="w-100">
                <input type="text" onChange={(e) => setLocation(e.target.value)} className="search-locations form-control" placeholder="Location" />
            </div>
            <RangePicker onChange={(value, dateString) => setDate(dateString)} disabledDate={(current)=>
                current && current.valueOf() < Date.now()
            } className="w-100" />
            <Select onChange={(value) => setBed(value)} className="w-100" size="large" placeholder="Number of Beds">
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>
            </Select>
            <SearchOutlined onClick={handleSubmit} className="btn p-3 btn-primary btn-square" />
        </div>
    )
}