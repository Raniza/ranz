import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Ranz from "../Image/ranz2.png";

function Header({ handleShow }) {
    return (
        <Navbar expand="lg" className="bg-light border-bottom py-1">
            <Container>
                <Navbar.Brand href="#">
                    <FontAwesomeIcon
                        icon={faBars}
                        className="d-lg-none"
                        onClick={handleShow}
                    />{" "}
                    &nbsp;
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
            </Container>
        </Navbar>
    );
}

export default Header;
