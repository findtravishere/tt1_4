import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Schedule Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        Are you sure you want to delete this transaction? This action is
        irreversible and cannot be undone.
        <div style={{ display: "flex", marginTop: 20, gap: 10 }}>
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger">Delete</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
