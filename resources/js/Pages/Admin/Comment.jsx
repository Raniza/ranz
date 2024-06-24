import React, { useEffect, useState } from "react";
import SideMenu from "../Components/SideMenu";
import { router, usePage } from "@inertiajs/react";
import FlashMessage from "../Components/FlashMessage";
import RejectModal from "./Components/RejectModal";

export default function Comment({ comments }) {
    const { flash } = usePage().props;
    const [flashShow, setFlashShow] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [commentId, setCommentId] = useState(null);
    const [showReject, setShowReject] = useState(false);

    const handleApproveComment = (id) => {
        const url = "/tutorials/comments/" + id;

        router.put(url, null, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => setFlashShow(true),
        });
    };

    const handleCloseRejectModal = () => {
        setShowReject(false);
        setCommentId(null);
    };

    const handleRejectComment = (reasons) => {
        const url = "/tutorials/comments/" + commentId;
        const data = { reason: reasons };

        router.visit(url, {
            method: "delete",
            data: data,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: (page) => {
                alert(page.props.flash.message);
            },
        });
    };

    useEffect(() => {
        if (flashShow) {
            console.log(flashShow);
        }
    }, [flashShow]);

    return (
        <SideMenu>
            <FlashMessage
                flashShow={flashShow}
                handleClose={() => setFlashShow(false)}
                message={flash.message}
                success={flash.success}
            />

            <RejectModal
                show={showReject}
                handleClose={handleCloseRejectModal}
                handleSubmit={handleRejectComment}
                processing={processing}
            />

            {Object.keys(comments).length > 0 ? (
                Object.keys(comments).map((key, index) => (
                    <React.Fragment key={key}>
                        <h6 className="mt-2">
                            #{index + 1} {comments[key][0].tutorial.title.title}{" "}
                            - {comments[key][0].tutorial.sub_title}
                        </h6>
                        <p>
                            Author:{" "}
                            <span
                                className="text-muted"
                                style={{ fontSize: "14px" }}
                            >
                                {comments[key][0].tutorial.title.author.name}
                            </span>
                            <br />
                            {comments[key][0].tutorial.title.prologue}
                        </p>

                        <strong>Comment: </strong>
                        <br />
                        {comments[key].map((comment, index2) => (
                            <blockquote className="mb-3 mt-2" key={comment.id}>
                                #{index + 1}.{index2 + 1}
                                <br />
                                {comment.comment}
                                <br />
                                <span
                                    className="text-muted"
                                    style={{ fontSize: "14px" }}
                                >
                                    {comment.user.name}
                                </span>
                                <br />
                                <button
                                    className="btn btn-sm btn-primary mt-2"
                                    onClick={() =>
                                        handleApproveComment(comment.id)
                                    }
                                    disabled={processing}
                                >
                                    Approve
                                </button>{" "}
                                <button
                                    className="btn btn-sm btn-danger mt-2"
                                    onClick={() => {
                                        setShowReject(true);
                                        setCommentId(comment.id);
                                    }}
                                    disabled={processing}
                                >
                                    Reject
                                </button>
                            </blockquote>
                        ))}

                        <hr />
                    </React.Fragment>
                ))
            ) : (
                <blockquote className="mt-2">
                    Tidak ada data comment.
                </blockquote>
            )}
        </SideMenu>
    );
}
