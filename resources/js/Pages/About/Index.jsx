import { Button } from "react-bootstrap";
import Layout from "../Components/Layout";
import { user } from "../Config/Helper";
import { Link, usePage } from "@inertiajs/react";

export default function About({ about }) {
    const { auth } = usePage().props;
    return (
        <Layout>
            {auth.user && auth.user.role == "Admin" && (
                <Button
                    variant="outline-primary"
                    size="sm"
                    className="mb-2"
                    as={Link}
                    href="/about/edit"
                >
                    Edit Profile
                </Button>
            )}
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4 p-2">
                        <img
                            src={user.user1}
                            className="img-fluid rounded-start"
                            alt="user"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Arlenda Fitranto</h5>
                            {about && (
                                <>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: about.contents,
                                        }}
                                    ></div>
                                    <p className="card-text mt-2">
                                        <small className="text-body-secondary">
                                            Last updated {about.formatted_date}
                                        </small>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
