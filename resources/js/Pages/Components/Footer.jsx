import { Container, Navbar } from "react-bootstrap";
import Ranz from "../Image/ranz2.png";
import { useEffect, useState } from "react";

export default function Footer({ user }) {
    const [isFixedBottom, setIsFixedBottom] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const contentHeight = document.body.scrollHeight;
            const viewportHeight = window.innerHeight;
            setIsFixedBottom(contentHeight <= viewportHeight);
        };

        handleResize(); // Check initially

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Navbar
            className="bg-body-tertiary border-top mt-3"
            fixed={isFixedBottom ? "bottom" : undefined}
        >
            <Container>
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Brand href="#home">
                        <img
                            src={Ranz}
                            width="28"
                            height="28"
                            className="d-inline-block align-top"
                            alt="Ranzcoding"
                        />{" "}
                        <span
                            className="fw-bolder"
                            style={{ color: "#512DA8" }}
                        >
                            RANZ
                        </span>
                    </Navbar.Brand>
                    <Navbar.Text>Signed in as: {user}</Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Toggle />
            </Container>
        </Navbar>
    );
}
