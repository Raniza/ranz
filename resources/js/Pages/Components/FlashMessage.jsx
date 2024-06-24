import { Modal, Button, Card } from "react-bootstrap";

export default function FlashMessage({
    flashShow,
    handleClose,
    message,
    success,
}) {
    return (
        <Modal show={flashShow} onHide={handleClose}>
            <Card
                className="border-0"
                bg={success ? "success" : "danger"}
                text="white"
            >
                <Modal.Body>
                    {message}
                    <br />
                    <div className="d-flex justify-content-end">
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            size="sm"
                        >
                            Close
                        </Button>
                    </div>
                </Modal.Body>
            </Card>
        </Modal>
    );
}
