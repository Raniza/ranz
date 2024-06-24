import { Button, Card, Form } from "react-bootstrap";
import Layout from "../Components/Layout";
import { router } from "@inertiajs/react";

export default function VerifyEmail() {
    const handleSubmitVerifyEMail = () => {
        router.post("/email/resend");
    };

    return (
        <Layout>
            <Card className="col-10 m-auto mt-5">
                <Card.Body>
                    <Card.Title>Verifikasi email anda</Card.Title>
                    <Card.Text>
                        Sebelum melanjutkan proses ini, silahkan check email
                        anda untuk verifikasi link. Jika anda tidak mendapatkan
                        email,
                    </Card.Text>
                    <Form onSubmit={handleSubmitVerifyEMail}>
                        <Button size="sm" variant="primary" type="submit">
                            Click untuk mengirimkan kembali link verifikasi
                            email
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Layout>
    );
}
