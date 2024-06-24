import Layout from "../Components/Layout";
import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup, Row, Col, Spinner } from "react-bootstrap";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTitleModal from "./Components/AddTitleModal";
import { capitalize } from "../Config/Helper";
import { router, usePage } from "@inertiajs/react";
import FlashMessage from "../Components/FlashMessage";

export default function Create({ categories, titles, tutorial, edit_mode }) {
    const { flash } = usePage().props;
    const [flashShow, setFlashShow] = useState(true);

    const [showAddTitleModal, setShowAddTitleModal] = useState(false);
    const [title, setTitle] = useState();
    const [subTitle, setSubTitle] = useState("");
    const [category, setCategory] = useState("---");
    const [isProcess, setIsProcess] = useState(false);
    const [errors, setErrors] = useState();

    const editorRef = useRef();
    const titleRef = useRef();
    const toolbarRef = useRef();

    const handleFlashClose = () => {
        setFlashShow(false);
        router.get("/tutorials/all/create");
    };

    const handleCLoseAddTitleModal = () => {
        setShowAddTitleModal(false);
    };

    const handleTitleChange = (e) => {
        const title_id = titleRef.current.value;

        if (title_id !== "") {
            setTitle(title_id);

            const category_id = titles.filter((item) => item.id == title_id)[0]
                .category_id;

            const category_name = categories.filter(
                (item) => item.id == category_id
            )[0].category;

            setCategory(category_name);
        } else {
            setCategory("---");
        }
    };

    const saveTutorial = () => {
        const url = "/tutorials/all";
        const data = {
            title: parseInt(title),
            sub_title: subTitle,
            tutorial_id: edit_mode ? tutorial.id : null,
            content: $(editorRef.current).summernote("code"),
        };

        router.post(url, data, {
            onError: (errors) => {
                setErrors(errors);
            },
            onStart: () => setIsProcess(true),
            onFinish: () => setIsProcess(false),
            onSuccess: () => setFlashShow(true),
        });
    };

    useEffect(() => {
        if (tutorial) {
            $(editorRef.current).summernote("code", tutorial.contents);
            handleTitleChange();
            setSubTitle(tutorial.sub_title);
            // console.log(tutorial);
        } else {
            $(editorRef.current).summernote({
                placeholder: "Tulis isi tutorial disini",
                callbacks: {
                    onInit: function () {
                        $(editorRef.current).summernote("code", "");
                    },

                    onFullscreen: function (isFullscreen) {
                        if (isFullscreen) {
                            toolbarRef.current.style.display = "none";
                            console.log("Full");
                        } else {
                            toolbarRef.current.style.display = "flex";
                            console.log("Not Full");
                        }
                    },
                },
            });
        }
    }, []);

    return (
        <Layout>
            <AddTitleModal
                show={showAddTitleModal}
                handleClose={handleCLoseAddTitleModal}
                categories={categories}
            />

            {flash.message && (
                <FlashMessage
                    flashShow={flashShow}
                    handleClose={handleFlashClose}
                    message={flash.message}
                    success={flash.success}
                />
            )}

            <div className="d-flex justify-content-between" ref={toolbarRef}>
                <h4>
                    <span className="text-primary fw-bolder">
                        {edit_mode ? "Update" : "Create"}
                    </span>{" "}
                    Tutorial
                </h4>
                <div>
                    {!edit_mode && (
                        <>
                            <Button
                                variant="primary"
                                onClick={() => setShowAddTitleModal(true)}
                                className="btn-sm"
                                disabled={isProcess}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Add Title
                            </Button>{" "}
                        </>
                    )}
                    {isProcess ? (
                        <Button variant="success" size="sm" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{" "}
                            Loading...
                        </Button>
                    ) : (
                        <Button
                            variant="success"
                            size="sm"
                            onClick={saveTutorial}
                            disabled={isProcess}
                        >
                            <FontAwesomeIcon icon={faFloppyDisk} /> Save
                            Tutorial
                        </Button>
                    )}
                </div>
            </div>

            <Row>
                <Col xs={12} lg={4}>
                    <Form.Select
                        className={`mb-2 ${
                            errors && errors.title ? "is-invalid" : ""
                        }`}
                        ref={titleRef}
                        aria-label="Select tutorial title"
                        size="sm"
                        name="title"
                        onChange={handleTitleChange}
                        disabled={isProcess}
                        defaultValue={edit_mode ? tutorial.title_id : ""}
                    >
                        <option value="">Open to select title</option>
                        {titles &&
                            titles.map((value) => (
                                <option
                                    value={value.id}
                                    key={`title-${value.id}`}
                                >
                                    {value.title}
                                </option>
                            ))}
                    </Form.Select>
                    {errors && errors.title && (
                        <span
                            className="text-danger mb-2"
                            style={{ fontSize: "14px" }}
                        >
                            {errors.title}
                        </span>
                    )}
                </Col>
                <Col xs={12} lg={4}>
                    <InputGroup className="mb-0" size="sm">
                        <InputGroup.Text
                            id="sub_title-addon"
                            className="py-0 mb-2"
                        >
                            Sub Title
                        </InputGroup.Text>
                        <Form.Control
                            className={`mb-2 ${
                                errors && errors.sub_title ? "is-invalid" : ""
                            }`}
                            placeholder="Sub title"
                            aria-label="Sub title"
                            aria-describedby="sub_title-addon"
                            name="sub_title"
                            onChange={(e) => setSubTitle(e.target.value)}
                            disabled={isProcess}
                            value={subTitle}
                        />
                    </InputGroup>

                    {errors && errors.sub_title && (
                        <span
                            className="text-danger mb-2"
                            style={{ fontSize: "14px" }}
                        >
                            {errors.sub_title}
                        </span>
                    )}
                </Col>
                <Col xs={12} lg={4}>
                    <p className="d-flex justify-content-end mb-2">
                        Category: &nbsp;
                        <span className="fw-bolder text-danger mb-2">
                            {capitalize(category)}
                        </span>
                    </p>
                </Col>
            </Row>

            <Row style={{ backgroundColor: "white" }} className="d-flex">
                <Col className="mb-3">
                    <textarea name="tutorial" ref={editorRef}></textarea>
                    {errors && errors.content && (
                        <span
                            className="text-danger mb-2"
                            style={{ fontSize: "14px" }}
                        >
                            {errors.content}
                        </span>
                    )}
                </Col>
            </Row>
        </Layout>
    );
}
