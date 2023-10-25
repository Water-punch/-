import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from '../../../utils/api';

function AwardCard({ portfolioOwnerId, setAwards, award, isEditable, setIsEditing }) {

  const deletecard = async () => {
    if(window.confirm('게시물을 삭제하시겠습니까?')) {
        await Api.delete(`${portfolioOwnerId}/awards/${award._id}`).then((res) => {
            alert("삭제되었습니다!");
            setAwards((prev)=> prev.filter((item)=>item._id !== award._id));
        })
    } 
  }

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.name}</span>
          <br />
          <span>{award.organization}</span>
          <br/>
          <span className="text-muted">{award.awardedDate.split('T')[0]} 취득</span>
          <br />
          <span className="text-muted">{award.Info}</span>
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
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deletecard()}
              className="mr-3"
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
