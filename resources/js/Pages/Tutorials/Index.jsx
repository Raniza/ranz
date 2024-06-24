import Layout from "../Components/Layout";
import { Link, usePage, router } from "@inertiajs/react";
import { Button, Col, Row } from "react-bootstrap";
import React, { useEffect } from "react";
import { capitalize, logo } from "../Config/Helper";

export default function Tutorials({ titles }) {
    const { auth } = usePage().props;

    useEffect(() => {
        console.log();
    }, []);

    return (
        <Layout>
            {auth.user && auth.user.role !== "visitor" && (
                <>
                    <Link href="/tutorials/all/create">
                        <Button variant="primary" className="btn-sm mt-2">
                            Create Tutorial
                        </Button>
                    </Link>{" "}
                    <Link href="/tutorials/list">
                        <Button variant="success" size="sm" className="mt-2">
                            Tutorial List
                        </Button>
                    </Link>
                    {/* <hr /> */}
                </>
            )}
            {titles &&
                Object.keys(titles).map((category) => (
                    <React.Fragment key={category}>
                        <h3 className="mt-2">
                            <img
                                src={logo[category]}
                                alt={category}
                                width={60}
                            />{" "}
                            <span className="align-bottom">
                                {capitalize(category)}
                            </span>
                        </h3>
                        <Row>
                            {titles[category].map((title) => (
                                <Col md="12" lg="6" key={title.id}>
                                    <h5>{title.title}</h5>
                                    <h6 className="mb-0">
                                        Author: {title.author.name}
                                    </h6>
                                    <span
                                        className="text-muted"
                                        style={{ fontSize: "14px" }}
                                    >
                                        {title.updated_at}
                                    </span>
                                    <p className="mt-2">{title.prologue}</p>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        type="button"
                                        onClick={() =>
                                            router.get(
                                                "/tutorials/title/" + title.id
                                            )
                                        }
                                    >
                                        Details
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                        <hr />
                    </React.Fragment>
                ))}
        </Layout>
    );
}
