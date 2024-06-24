import { Modal, Button, Form, Spinner, CloseButton } from "react-bootstrap";
import { capitalize } from "../../Config/Helper";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function AddTitleModal({ show, handleClose, categories }) {
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            title: "",
            prologue: "",
            category_id: "",
        });

    const prologueRef = useRef();

    const handleTitleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData({ ...data, [key]: value });
    };

    const handleSaveTitle = (e) => {
        e.preventDefault();
        post("/tutorials/title", {
            onSuccess: () => handleHide(),
        });
    };

    const handleHide = () => {
        reset();
        clearErrors();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header className="py-1">
                <Modal.Title className="fs-5">Add Title</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveTitle}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            className={
                                errors && errors.title ? "is-invalid" : ""
                            }
                            type="text"
                            placeholder="Typed title here..."
                            autoFocus
                            size="sm"
                            name="title"
                            onChange={handleTitleChange}
                            disabled={processing}
                        />
                        {errors && errors.title && (
                            <span
                                className="text-danger"
                                style={{ fontSize: "14px" }}
                            >
                                {errors.title}
                            </span>
                        )}
                    </Form.Group>
                    <Form.Select
                        className={
                            errors && errors.category_id ? "is-invalid" : ""
                        }
                        aria-label="Select tutorial category"
                        size="sm"
                        onChange={handleTitleChange}
                        name="category_id"
                        disabled={processing}
                    >
                        <option value={""}>Open to select category</option>
                        {categories &&
                            categories.map((category) => (
                                <option
                                    value={category.id}
                                    key={`cat-${category.id}`}
                                >
                                    {capitalize(category.category)}
                                </option>
                            ))}
                    </Form.Select>
                    {errors && errors.category_id && (
                        <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                        >
                            {errors.category_id}
                        </span>
                    )}
                    <Form.Group
                        className="mb-2 mt-2"
                        controlId="prologue,textarea"
                    >
                        <Form.Label>Prologue</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            className={
                                errors && errors.prologue ? "is-invalid" : ""
                            }
                            placeholder="Isikan prologoe untuk ditampilkan dihalaman list dan tutorial."
                            name="prologue"
                            disabled={processing}
                            ref={prologueRef}
                            onChange={handleTitleChange}
                        />
                        <span
                            className="text-muted"
                            style={{ fontSize: "14px" }}
                        >
                            {prologueRef.current
                                ? prologueRef.current.value.length
                                : 0}{" "}
                            / 1000
                        </span>
                        <br />
                        {errors && errors.prologue && (
                            <span
                                className="text-danger"
                                style={{ fontSize: "14px" }}
                            >
                                {errors.prologue}
                            </span>
                        )}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleHide}
                        size="sm"
                        disabled={processing}
                    >
                        Close
                    </Button>
                    {processing ? (
                        <Button variant="primary" size="sm" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{" "}
                            Loading...
                        </Button>
                    ) : (
                        <Button variant="primary" type="submit" size="sm">
                            Save Changes
                        </Button>
                    )}
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
