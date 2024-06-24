import { Button, Form } from "react-bootstrap";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import OverlayTooltip from "../Components/OverlayTooltip";
import AuthLayout from "./AuthLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightToBracket,
    faArrowUpFromBracket,
    faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FlashMessage from "../Components/FlashMessage";

export default function Login() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: "",
        password: "",
    });

    const [flashShow, setFlashShow] = useState(true);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setData({ ...data, [key]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/auth", {
            onError: () => setFlashShow(true),
            onSuccess: () => {
                clearErrors();
                // console.log(flash.message);
            },
        });
    };
    return (
        <>
            {errors && errors.notmatch && (
                <FlashMessage
                    flashShow={flashShow}
                    message={errors.notmatch}
                    handleClose={() => setFlashShow(false)}
                    success={false}
                />
            )}
            <AuthLayout
                title="LOGIN"
                info="Silahkan login untuk memulai sesi anda."
                handleSubmit={handleSubmit}
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                        disabled={processing}
                        autoFocus
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
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        disabled={processing}
                    />
                    {errors && errors.password && (
                        <span
                            className="text-danger mb-2"
                            style={{ fontSize: "16px" }}
                        >
                            {errors.password}
                        </span>
                    )}
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button
                        variant="primary"
                        type="submit"
                        size="sm"
                        disabled={processing}
                    >
                        <FontAwesomeIcon icon={faArrowRightToBracket} /> Sign In
                    </Button>
                    <Button
                        variant="outline-success"
                        size="sm"
                        className="col-12"
                        onClick={() => router.get("/register")}
                        disabled={processing}
                    >
                        <FontAwesomeIcon icon={faArrowUpFromBracket} /> SIgn Up
                    </Button>
                </div>
                {!processing && (
                    <OverlayTooltip
                        id="loginTooltip"
                        title="Kembali ke halaman utama"
                    >
                        <Link href="/">
                            <FontAwesomeIcon icon={faHouse} /> Home
                        </Link>
                    </OverlayTooltip>
                )}
            </AuthLayout>
        </>
    );
}
