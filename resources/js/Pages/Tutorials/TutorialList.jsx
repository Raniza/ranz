import { Badge, Placeholder, Table } from "react-bootstrap";
import Layout from "../Components/Layout";
import React, { useState, useEffect } from "react";
import { capitalize } from "../Config/Helper";
import { usePage, router } from "@inertiajs/react";

export default function TutorialList({ titles }) {
    const { auth } = usePage().props;
    const [processing, setProcessing] = useState(false);

    const publishSubTitle = (id) => {
        const confirmUser = confirm(
            "Dengan mengubah status menjadi publish, akan terlihat pada halaman RANZ oleh semua pengunjung. Apakah anda yakin publish tutorial ini?"
        );

        if (confirmUser) {
            router.post("/tutorials/list/publish/" + id, id, {
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            });
        }
    };

    const editTutorial = (id) => {
        router.get("/tutorials/all/" + id + "/edit");
    };

    function Process({ children, numCols = 7 }) {
        const tableCell = Array.from({ length: numCols })
            .fill(null)
            .map(() => (
                <td key={Math.random()}>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} size="lg" />
                    </Placeholder>
                </td>
            ));

        return <>{processing ? <tr>{tableCell}</tr> : children}</>;
    }

    useEffect(() => {
        // console.log(titles), [];
    });

    return (
        <Layout>
            <Table className="table caption-top" size="sm">
                <caption>List of tutorials</caption>
                <thead>
                    <tr className="text-center">
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Subtitle</th>
                        <th>Author</th>
                        <th>Publish</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <Process>
                        {titles.length > 0 ? (
                            <>
                                {titles.map((title, index) => (
                                    <React.Fragment key={title.id}>
                                        <tr key={title.id}>
                                            <td
                                                rowSpan={
                                                    title.tutorials.length + 1
                                                }
                                            >
                                                {index + 1}
                                            </td>
                                            <td
                                                rowSpan={
                                                    title.tutorials.length + 1
                                                }
                                            >
                                                {title.title}
                                            </td>
                                            <td
                                                rowSpan={
                                                    title.tutorials.length + 1
                                                }
                                            >
                                                {capitalize(
                                                    title.category.category
                                                )}
                                            </td>
                                        </tr>
                                        {title.tutorials &&
                                            title.tutorials.map((tutorial) => (
                                                <tr key={tutorial.id}>
                                                    <td>
                                                        {tutorial.sub_title}
                                                    </td>
                                                    <td className="text-center">
                                                        {title.author.name}
                                                    </td>
                                                    <td className="text-center">
                                                        {tutorial.is_publish ? (
                                                            <Badge
                                                                pill
                                                                bg="secondary"
                                                            >
                                                                Published
                                                            </Badge>
                                                        ) : (
                                                            <Badge
                                                                pill
                                                                bg="warning"
                                                            >
                                                                Draft
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {tutorial.is_publish ? (
                                                            <>
                                                                {auth.user.id ==
                                                                title.author
                                                                    .id ? (
                                                                    <Badge
                                                                        pill
                                                                        bg="primary"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                        }}
                                                                        onClick={() =>
                                                                            editTutorial(
                                                                                tutorial.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </Badge>
                                                                ) : (
                                                                    "-"
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {auth.user.id ==
                                                                title.author
                                                                    .id ? (
                                                                    <>
                                                                        <Badge
                                                                            pill
                                                                            bg="success"
                                                                            style={{
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                                publishSubTitle(
                                                                                    tutorial.id
                                                                                )
                                                                            }
                                                                        >
                                                                            Publish
                                                                        </Badge>{" "}
                                                                        <Badge
                                                                            pill
                                                                            bg="primary"
                                                                            style={{
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                                editTutorial(
                                                                                    tutorial.id
                                                                                )
                                                                            }
                                                                        >
                                                                            Edit
                                                                        </Badge>
                                                                    </>
                                                                ) : (
                                                                    "-"
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    No Data
                                </td>
                            </tr>
                        )}
                    </Process>
                </tbody>
            </Table>
        </Layout>
    );
}
