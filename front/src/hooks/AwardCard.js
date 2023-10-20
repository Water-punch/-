import { Card, Button, Row, Col } from "react-bootstrap";

function AwardCard({ award, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.name}</span>
          <br />
          <span>{award.organization}</span>
          <br/>
          <span className="text-muted">{award.getDate.split('T')[0]} 취득</span>
          <br />
          <span className="text-muted">{award.awardInfo}</span>
        </Col>

        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
