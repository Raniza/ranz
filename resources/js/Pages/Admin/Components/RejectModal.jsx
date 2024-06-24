import { useRef } from "react";
import { Button, Col, FloatingLabel, Modal, Row, Form } from "react-bootstrap";

export default function RejectModal({
    show,
    handleClose,
    processing,
    handleSubmit,
}) {
    const reasonReff = useRef();

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header className="py-1" closeButton>
                <h5 className="align-middle">Reject Comment</h5>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={12}>
                        <FloatingLabel
                            controlId="floatingTextareaReason"
                            label="Reasons"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="TUlis alasan comment direject disini."
                                style={{ height: "100px" }}
                                autoFocus
                                ref={reasonReff}
                                disabled={processing}
                            ></Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="py-1">
                <Button
                    variant="danger"
                    size="sm"
                    type="button"
                    className="ms-auto"
                    disabled={processing}
                    onClick={() => handleSubmit(reasonReff.current.value)}
                >
                    Reject & Send Notif
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
