import { Form, Button, Spinner, Stack } from "react-bootstrap";
import { Link, useForm } from "@inertiajs/react";
import AuthLayout from "./AuthLayout";
import OverlayTooltip from "../Components/OverlayTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightToBracket,
    faHouse,
} from "@fortawesome/free-solid-svg-icons";

export default function Register() {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData({ ...data, [key]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        post("/register-user", { preserveScroll: true });
    };

    const submitButton = () => {
        if (processing) {
            return (
                <Button variant="primary" type="button" size="sm" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />{" "}
                    Loading...
                </Button>
            );
        } else {
            return (
                <Button variant="primary" type="submit" size="sm">
                    Submit
                </Button>
            );
        }
    };

    return (
        <AuthLayout
            title="REGISTER"
            info="Register RANZ Coding"
            handleSubmit={handleSubmit}
        >
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    className={errors && errors.name ? "is-invalid" : ""}
                    type="text"
                    placeholder="Masukan nama anda"
                    onChange={handleChange}
                    name="name"
                    disabled={processing}
                    autoFocus
                />
                {errors && errors.name && (
                    <span className="text-danger" style={{ fontSize: "14px" }}>
                        {errors.name}
                    </span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    className={errors && errors.email ? "is-invalid" : ""}
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    disabled={processing}
                    name="email"
                />
                {errors && errors.email && (
                    <>
                        <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                        >
                            {errors.email}
                        </span>
                        <br />
                    </>
                )}
                <Form.Text className="text-muted">
                    Kami tidak akan pernah memberikan email anda kepada
                    siapapun.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    className={errors && errors.password ? "is-invalid" : ""}
                    type="password"
                    placeholder="Masukan password anda"
                    onChange={handleChange}
                    disabled={processing}
                    name="password"
                />
                {errors && errors.password && (
                    <span className="text-danger" style={{ fontSize: "14px" }}>
                        {errors.password}
                    </span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    className={
                        errors && errors.password_confirmation
                            ? "is-invalid"
                            : ""
                    }
                    type="password"
                    placeholder="Masukan password anda kembali"
                    onChange={handleChange}
                    disabled={processing}
                    name="password_confirmation"
                />
                {errors && errors.password_confirmation && (
                    <span className="text-danger" style={{ fontSize: "14px" }}>
                        {errors.password_confirmation}
                    </span>
                )}
            </Form.Group>
            <div className="d-grid gap-2">
                {/* <Button variant="primary" type="submit" size="sm">
                    Submit
                </Button> */}
                {submitButton()}
            </div>
            {!processing && (
                <Stack direction="horizontal" gap={3}>
                    <OverlayTooltip id="registerTooltip" title="Login page">
                        <Link href="/login">
                            <FontAwesomeIcon icon={faArrowRightToBracket} />{" "}
                            Login
                        </Link>
                    </OverlayTooltip>

                    <OverlayTooltip
                        id="loginTooltip"
                        title="Kembali ke halaman utama"
                    >
                        <Link className="ms-auto" href="/">
                            <FontAwesomeIcon icon={faHouse} /> Home
                        </Link>
                    </OverlayTooltip>
                </Stack>
            )}
        </AuthLayout>
    );
}
