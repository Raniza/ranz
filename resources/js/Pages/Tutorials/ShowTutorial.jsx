import { Accordion, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import Layout from "../Components/Layout";
import Comment from "./Components/Comment";
import { logo } from "../Config/Helper";
import FlashMessage from "../Components/FlashMessage";

export default function ShowTutorial({ title, tutorial, titleByCategory }) {
    const getTutorialData = (titleId, tutorialId) => {
        router.visit(
            "/tutorials/title/" + titleId + "?tutorial_id=" + tutorialId,
            { only: ["tutorial"], preserveScroll: true }
        );
        // console.log(titleId, tutorialId);
    };

    useEffect(() => {
        // console.log(tutorial);
    }, []);

    return (
        <Layout>
            <Row>
                <Col md="9" sm="12" className="mb-3">
                    <Card bg="light" className="rounded-3">
                        <Card.Body className="py-2">
                            <Card.Title>
                                <img
                                    src={logo[title.category.category]}
                                    height="26"
                                    className="align-middle"
                                />{" "}
                                <span className="align-middle">
                                    {title.title}
                                </span>
                            </Card.Title>

                            <Card.Subtitle className="mb-2 text-muted">
                                Author: {title.author.name}
                            </Card.Subtitle>
                            <hr />
                            <Card.Text style={{ textAlign: "justify" }}>
                                {title.prologue}
                            </Card.Text>
                            <Accordion defaultActiveKey="0" className="mb-3">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Contents
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ListGroup as="ol" numbered>
                                            {title.tutorials.map((tutor) => (
                                                <ListGroup.Item
                                                    key={tutor.id}
                                                    action
                                                    onClick={() =>
                                                        getTutorialData(
                                                            title.id,
                                                            tutor.id
                                                        )
                                                    }
                                                    active={
                                                        tutor.id == tutorial.id
                                                    }
                                                >
                                                    {tutor.sub_title}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            {tutorial && (
                                <>
                                    <Card.Subtitle className="mb-2">
                                        <span className="text-decoration-underline">
                                            {tutorial.sub_title}
                                        </span>
                                        <br />
                                        <span
                                            className="text-muted"
                                            style={{ fontSize: "14px" }}
                                        >
                                            {tutorial.updated_at}
                                        </span>
                                        <br />
                                    </Card.Subtitle>
                                    <div
                                        style={{ textAlign: "justify" }}
                                        dangerouslySetInnerHTML={{
                                            __html: tutorial.contents,
                                        }}
                                    ></div>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                    <Comment
                        tutorialId={tutorial.id}
                        comments={tutorial.comments}
                    />
                </Col>
                <Col md="3" sm="12">
                    <Card bg="light" className="rounded-3">
                        <Card.Body className="py-3">
                            <Card.Subtitle className="mb-0">
                                Related Contents:
                            </Card.Subtitle>
                            <ListGroup as="ol" variant="flush">
                                {titleByCategory.length > 0 ? (
                                    titleByCategory.map((title) => (
                                        <ListGroup.Item
                                            as={Link}
                                            key={title.id}
                                            href={
                                                "/tutorials/title/" + title.id
                                            }
                                        >
                                            {title.title}
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item>
                                        No related contents
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}
