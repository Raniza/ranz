import Layout from "./Components/Layout";
import FlashMessage from "./Components/FlashMessage";
import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Ranz from "./Image/ranz2.png";
import MetaTags from "./Components/MetaTags";

export default function Home({ home }) {
    const { flash, auth } = usePage().props;

    const [flashShow, setFlashShow] = useState(false);

    useEffect(() => {
        if (flash && flash.message) {
            setFlashShow(true);
        }
    }, []);

    return (
        <Layout>
            {flash && flash.message && (
                <FlashMessage
                    flashShow={flashShow}
                    message={flash.message}
                    handleClose={() => setFlashShow(false)}
                    success={flash.success}
                />
            )}
            {auth.user && auth.user.role === "Admin" && (
                <Button
                    variant="primary"
                    size="sm"
                    className="mb-2 mt-2"
                    onClick={() => router.get("/home/edit")}
                >
                    Edit Home
                </Button>
            )}
            <h5>
                <span className="fw-bolder" style={{ color: "#512DA8" }}>
                    RANZ{" "}
                    <img
                        className="align-top"
                        src={Ranz}
                        alt="Ranz Coding"
                        height="18"
                    />
                </span>{" "}
                - Home
            </h5>
            <div dangerouslySetInnerHTML={{ __html: home.contents }}></div>
        </Layout>
    );
}
