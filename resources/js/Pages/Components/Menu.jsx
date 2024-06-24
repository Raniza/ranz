import {
    Container,
    Nav,
    Navbar,
    Form,
    Button,
    Badge,
    Stack,
} from "react-bootstrap";
import { Link, usePage } from "@inertiajs/react";
import Ranz from "../Image/ranz2.png";

function Menu() {
    const { auth } = usePage().props;
    const { component, url } = usePage();

    return (
        <Navbar
            expand="lg"
            className="bg-body-tertiary border-bottom mb-2"
            sticky="top"
        >
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={Ranz}
                        width="28"
                        height="28"
                        className="d-inline-block align-top"
                        alt="Ranzcoding"
                    />{" "}
                    <span className="fw-bolder" style={{ color: "#512DA8" }}>
                        RANZ
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link
                            as={Link}
                            href="/"
                            className={component === "Home" ? "active" : ""}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            href="/tutorials/all"
                            className={
                                url.startsWith("/tutorials") ? "active" : ""
                            }
                        >
                            Tutorials
                        </Nav.Link>
                        <Nav.Link as={Link} href="#" disabled>
                            Demo
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            href="/about"
                            className={url === "/about" ? "active" : ""}
                        >
                            About
                        </Nav.Link>
                        {auth.user && auth.user.role === "Admin" && (
                            <Nav.Link
                                as={Link}
                                href="/admin"
                                className={url === "/admin" ? "active" : ""}
                                style={{ textDecoration: "underline" }}
                            >
                                Admin Panel
                            </Nav.Link>
                        )}
                        <Nav.Link
                            as={Link}
                            href={auth.user ? "/logout" : "/login"}
                        >
                            <Stack
                                direction="horizontal"
                                style={{ cursor: "pointer" }}
                            >
                                <Badge
                                    pill
                                    bg={auth.user ? "secondary" : "danger"}
                                    className="py-2 px-3"
                                >
                                    {auth.user ? "Logout" : "Login"}
                                </Badge>
                            </Stack>
                        </Nav.Link>
                    </Nav>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 form-control-sm"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" className="btn-sm">
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
