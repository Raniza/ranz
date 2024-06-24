import React, { useEffect, useState } from "react";
import SideMenu from "../Components/SideMenu";
import { Badge, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import ChangeRole from "./Components/ChangeRole";
import { router, usePage } from "@inertiajs/react";
import FlashMessage from "../Components/FlashMessage";

export default function Admin({ users }) {
    const { auth, flash } = usePage().props;

    const [processing, setProcessing] = useState(false);
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const [flashShow, setFlashShow] = useState(false);

    const handleModalHide = () => {
        setShow(false);
        setUserId(null);
        setUserRole(null);
    };

    const handleRoleChange = (role) => {
        setUserRole(role);
    };

    const hanleRoleSubmit = () => {
        const data = {
            user_id: userId,
            role: userRole,
        };

        router.put("/user/" + userId, data, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => {
                setShow(false);
            },
        });

        // console.log(data);
    };

    const handleDeleteUser = (id, name) => {
        const userConfirm = confirm(
            "Apakah anda yakin akan menghapus user '" + name + "' dari RANZ?"
        );

        if (userConfirm) {
            const url = "/user/" + id + "?name=" + name;

            router.delete(url, {
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onSuccess: () => setFlashShow(true),
            });
        }
    };

    const handleFlashHide = () => {
        setFlashShow(false);
    };

    useEffect(() => {
        // console.log(users);
    }, []);
    return (
        <SideMenu>
            <ChangeRole
                show={show}
                handleCLose={handleModalHide}
                defVal={userRole}
                handleChange={handleRoleChange}
                handleSubmit={hanleRoleSubmit}
                processing={processing}
            />

            <FlashMessage
                flashShow={flashShow}
                handleClose={handleFlashHide}
                success={flash.success}
                message={flash.message}
            />

            <Table striped bordered className="mt-2 caption-top">
                <caption>List of users</caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Verified</th>
                        <th>Role</th>
                        <th>Join Date</th>
                        <th>Change Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="text-center">
                                    {user.email_verified_at ? (
                                        <>
                                            <FontAwesomeIcon
                                                icon={faCircleCheck}
                                                className="text-success"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                className="text-danger"
                                            />
                                        </>
                                    )}
                                </td>
                                <td>{user.role}</td>
                                <td>{user.created_at}</td>
                                <td className="text-center">
                                    {auth.user && auth.user.id == user.id ? (
                                        <>-</>
                                    ) : (
                                        <>
                                            <Badge
                                                pill
                                                bg="success"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setShow(true);
                                                    setUserId(user.id);
                                                    setUserRole(
                                                        user.role.toLowerCase()
                                                    );
                                                }}
                                            >
                                                Edit
                                            </Badge>{" "}
                                            <Badge
                                                pill
                                                bg="danger"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    handleDeleteUser(
                                                        user.id,
                                                        user.name
                                                    )
                                                }
                                            >
                                                Delete
                                            </Badge>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="text-center">
                            <td colSpan={6}>No User Data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </SideMenu>
    );
}
