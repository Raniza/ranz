import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Stack, Spinner } from "react-bootstrap";
import Ranz from "../../Image/ranz2.png";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Components/FlashMessage";

export default function Comment({ tutorialId, comments }) {
    const { auth, flash } = usePage().props;
    const [flashShow, setFlashShow] = useState(false);

    const commentRef = useRef();

    const [errors, setErrors] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmitComment = () => {
        setErrors(null);

        const commentData = {
            user_id: auth.user.id,
            tutorial_id: tutorialId,
            comment: commentRef.current.value,
        };

        router.post("/tutorials/comments", commentData, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (errors) => setErrors(errors),
            onSuccess: () => {
                commentRef.current.value = "";
                setFlashShow(true);
                // router.reload({ only: ["tutorial"] });
            },
        });
        // console.log(commentData);
    };

    const handleAlertClose = () => {
        setFlashShow(false);
    };

    useEffect(() => {}, []);

    return (
        <>
            <FlashMessage
                flashShow={flashShow}
                handleClose={handleAlertClose}
                success={flash.success}
                message={flash.message}
            />

            <FlashMessage />
            <Card className="mt-3">
                <Card.Body className="py-2">
                    <h5>Comment</h5>
                    <hr />
                    <p className="align-middle">
                        Kebijakan komentar dalam{" "}
                        <img className="align-middle" src={Ranz} height={20} />{" "}
                        <span
                            className="fw-bolder align-baseline"
                            style={{ color: "#512DA8" }}
                        >
                            RANZ
                        </span>{" "}
                        bersifat moderasi. SIlahkan tinggalkan komentar dengan
                        lugas dan sopan. Admin akan menampilkan komentar anda.
                    </p>
                    <hr />
                    {comments &&
                        comments.length > 0 &&
                        comments.map((comment) => (
                            <React.Fragment key={comment.id}>
                                <p>
                                    {comment.user.name} <br />
                                    <span
                                        className="text-muted"
                                        style={{ fontSize: "14px" }}
                                    >
                                        {comment.updated_at}
                                    </span>
                                </p>
                                <p>{comment.comment}</p>
                                <hr />
                            </React.Fragment>
                        ))}

                    {auth.user ? (
                        <Stack gap={2}>
                            <label htmlFor="comment">Leave Comment</label>
                            <textarea
                                name="comment"
                                id="comment"
                                rows="2"
                                className={`form-control ${
                                    errors && errors.comment && "is-invalid"
                                }`}
                                ref={commentRef}
                                disabled={processing}
                            ></textarea>
                            {errors && errors.comment && (
                                <span
                                    className="text-danger"
                                    style={{ fontSize: "14px" }}
                                >
                                    {errors.comment}
                                </span>
                            )}
                            <Button
                                className="col-2 ms-auto"
                                variant="outline-primary"
                                size="sm"
                                disabled={processing}
                                onClick={handleSubmitComment}
                            >
                                {processing ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />{" "}
                                        Loading...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Stack>
                    ) : (
                        <Link href="/login">
                            <Button
                                variant="primary"
                                size="sm"
                                type="button"
                                className="rounded-pill px-3"
                            >
                                Login to Leave Comment
                            </Button>
                        </Link>
                    )}
                </Card.Body>
            </Card>
        </>
    );
}
