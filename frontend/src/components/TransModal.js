import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"



export default function TransModal({ show, handleClose }) {
    const bankidRef = useRef()
    const dateRef = useRef()
    const amountRef = useRef()
    const commentRef = useRef()
    function handleSubmit(e) {
        e.preventDefault()
        handleClose()


    }

    return ( 
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3" controlId="BankId">
                    <Form.Label>Bank ID</Form.Label>
                    <Form.Control ref={bankidRef} type="number" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Date</Form.Label>
                    <Form.Control ref={dateRef} type="date" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Transaction Amount</Form.Label>
                    <Form.Control ref={amountRef} type="number" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control ref={commentRef} type="text" required />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="danger" type="submit">
                    Add
                    </Button>
                </div>
                </Modal.Body>
            </Form>
        </Modal>
     );
}