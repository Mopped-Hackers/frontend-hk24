import {Col, Container, Row} from "react-bootstrap";

export default function NotFound() {
  return (
    <>
        <Container>
            <Row>
                <Col md={12}>
                    <h1>404</h1>
                    <p>Oops! The page you are looking for was not found.</p>
                    <a href="/">Go Home</a>
                </Col>
            </Row>
        </Container>
    </>
  )
}
