import { Modal } from "antd";

export default function OrderModal({session, orderedBy, showModal, setShowModal}:any) {
    return (
        <Modal 
            title="Order PaymentInfo"
            centered
            open={showModal}
            onCancel={() => setShowModal(false)}
            onOk={() => setShowModal(false)}
        >
            <p>Payment Intent: {session.payment_intent}</p>
            <p>Payment Status: {session.payment_status}</p>
            <p>Amount Total: {session.currency.toUpperCase()}{" "}
                {(session.amount_total / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "usd",
                })}
            </p>
            <p>Ordered By: {orderedBy.name}</p>
        </Modal>
    )
}