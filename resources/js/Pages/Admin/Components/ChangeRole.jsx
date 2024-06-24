import { Button, Form, Modal } from "react-bootstrap";

export default function ChangeRole({
    show,
    handleCLose,
    defVal,
    handleChange,
    handleSubmit,
    processing,
}) {
    const roles = ["Admin", "Editor", "Visitor"];

    return (
        <Modal show={show} onHide={handleCLose} size="sm" backdrop="static">
            <Modal.Header className="py-1">
                <Modal.Title>Change Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select
                    defaultValue={defVal}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={processing}
                >
                    {roles.map((role) => (
                        <option key={role} value={role.toLowerCase()}>
                            {role}
                        </option>
                    ))}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer className="py-1">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCLose}
                    disabled={processing}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    size="sm"
                    disabled={processing}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
