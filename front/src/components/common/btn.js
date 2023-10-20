import { Container, Button,  Col, Row } from "react-bootstrap";

function Btn({onButtonClick }) {


    return(
        <Container fluid>
        <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
            <Button
                onClick={
                    onButtonClick
                }
            >
            + 
            </Button>
            </Col>
            </Row>
        </Container>

    )}

export default Btn;