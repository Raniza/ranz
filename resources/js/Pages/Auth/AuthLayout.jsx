import { Card, Col, Form, Row, Stack } from "react-bootstrap";
import Ranz from "../Image/ranz2.png";

export default function AuthLayout({ children, title, info, handleSubmit }) {
    return (
        <Row>
            <Col xs="11" lg="4" className="m-auto py-5">
                <Card className="ranz-border">
                    <Card.Body>
                        <Stack gap="2" className="col-m mx-auto mb-1">
                            <h4 className="text-center">
                                <img
                                    src={Ranz}
                                    alt="ranz"
                                    width="26"
                                    height="26"
                                    className="align-middle"
                                />{" "}
                                <span className="align-middle">{title}</span>
                            </h4>
                            <p className="text-center">{info}</p>
                        </Stack>
                        <hr className="mt-0" />
                        <Form onSubmit={handleSubmit}>{children}</Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
