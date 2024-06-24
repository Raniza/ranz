import { useEffect, useRef, useState } from "react";
import { Row, Col, Button, Placeholder } from "react-bootstrap";
import Layout from "../Components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { router } from "@inertiajs/react";

export default function AboutEdit({ about }) {
    const editorRef = useRef();

    const [processing, setProcessing] = useState(false);

    const saveAbout = () => {
        const data = {
            contents: $(editorRef.current).summernote("code"),
        };

        router.post("/about/save", data, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (errors) => alert(errors.contents),
        });
    };
    useEffect(() => {
        if (about) {
            $(editorRef.current).summernote("code", about.contents);
        } else {
            $(editorRef.current).summernote({
                placeholder: "Tulis about disini.",
                callbacks: {
                    onInit: function () {
                        $(editorRef.current).summernote("code", "");
                    },
                },
            });
        }
    }, []);

    return (
        <Layout>
            <Row>
                <Col>
                    <Button
                        variant="outline-success"
                        size="sm"
                        className="mb-2"
                        onClick={saveAbout}
                        disabled={processing}
                    >
                        <FontAwesomeIcon icon={faFloppyDisk} /> Save About
                    </Button>
                </Col>
            </Row>
            <Row style={{ backgroundColor: "white" }}>
                <Col className="mb-3">
                    {processing ? (
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={8} size="lg" />
                            <br />
                            <Placeholder.Button
                                className="mt-3"
                                xs={2}
                                aria-hidden="true"
                            />
                        </Placeholder>
                    ) : (
                        <textarea name="about" ref={editorRef}></textarea>
                    )}
                </Col>
            </Row>
        </Layout>
    );
}
