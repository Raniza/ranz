import React, { useState } from "react";
import { Container, Row, Col, Offcanvas, Nav } from "react-bootstrap";
import Header from "./Header";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

function SideMenu({ children }) {
    const { component } = usePage();
    const { auth } = usePage().props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col lg={2} className="d-none d-lg-block bg-dark sidebar">
                        <h4 className="px-3 py-2 text-white mb-0">Admin</h4>

                        <p
                            className="px-3 text-white mt-0"
                            style={{ fontSize: "14px" }}
                        >
                            {auth.user.name}
                        </p>
                        <hr className="px-3 text-white mt-0" />
                        <Nav className="flex-column">
                            <Nav.Link as={Link} href="/">
                                <FontAwesomeIcon icon={faHouse} /> Home
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                href="/admin"
                                className={`text-white ${
                                    component === "Admin/Index" ? "active" : ""
                                }`}
                            >
                                <FontAwesomeIcon icon={faUsers} /> Users
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                href="/tutorials/comments"
                                className={`text-white ${
                                    component === "Admin/Comment"
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <FontAwesomeIcon icon={faCommentDots} /> Comment
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col lg={10} md={12} className="content">
                        <Header className="mt-n1" handleShow={handleShow} />
                        <Container>{children}</Container>
                    </Col>
                </Row>
            </Container>

            <Offcanvas show={show} onHide={handleClose} className="bg-dark">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className={`text-white`}>
                        Admin
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link
                            as={Link}
                            className={`text-white ${
                                component === "Admin/Index" ? "active" : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faUsers} /> Users
                        </Nav.Link>

                        <Nav.Link as={Link} className={`text-white`}>
                            <FontAwesomeIcon icon={faCommentDots} /> Comment
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default SideMenu;
