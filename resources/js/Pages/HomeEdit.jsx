import { Button, Row, Col, Placeholder } from "react-bootstrap";
import Layout from "./Components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";

export default function HomeEdit({ home }) {
    const editorRef = useRef();

    const [processing, setProcessing] = useState(false);

    const saveHome = () => {
        const data = {
            contents: $(editorRef.current).summernote("code"),
        };
        router.post("/home/save", data, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (errors) => alert(errors.contents),
        });
    };

    useEffect(() => {
        if (home) {
            $(editorRef.current).summernote("code", home.contents);
        } else {
            $(editorRef.current).summernote({
                placeholder: "Tulis home web disini.",
                callbacks: {
                    onInit: function () {
                        $(editorRef.current).summernote("code", "");
                    },
                },
            });
        }
        console.log(home);
    }, [processing]);

    return (
        <Layout>
            <div className="d-flex justify-content-between mb-2">
                <h4 className="text-primary">Edit Home</h4>
                <Button
                    variant="success"
                    size="sm"
                    onClick={saveHome}
                    disabled={processing}
                >
                    <FontAwesomeIcon icon={faFloppyDisk} /> Save Home
                </Button>
            </div>
            {processing ? (
                <>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={8} size="lg" />
                        <br />
                        <Placeholder.Button
                            className="mt-3"
                            xs={2}
                            aria-hidden="true"
                        />
                    </Placeholder>
                </>
            ) : (
                <Row style={{ backgroundColor: "white" }}>
                    <Col className="mb-3">
                        <textarea name="tutorial" ref={editorRef}></textarea>
                    </Col>
                </Row>
            )}
        </Layout>
    );
}
