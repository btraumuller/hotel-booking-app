import {LoadingOutlined} from '@ant-design/icons';

const StripeCallback = ({history}:any) => {
    return (
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 text-danger p-5"/>
        </div>
    )
}

export default StripeCallback;