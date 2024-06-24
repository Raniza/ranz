import Menu from "./Menu";
import { Container } from "react-bootstrap";
import { usePage } from "@inertiajs/react";
import Footer from "./Footer";

export default function Layout({ children }) {
    const { auth } = usePage().props;
    return (
        <>
            <Menu />
            <Container className="mb-3">{children}</Container>
            <Footer user={auth.user ? auth.user.name : "Guest"} />
        </>
    );
}
