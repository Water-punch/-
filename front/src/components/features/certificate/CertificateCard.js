import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from '../../../utils/api';

function CertificateCard({ portfolioOwnerId, setCertificates, certificate, isEditable, setIsEditing }) {

  const deletecard = async () => {
    if(window.confirm('게시물을 삭제하시겠습니까?')) {
      console.log(portfolioOwnerId);
        await Api.delete(`${portfolioOwnerId}/certificates/${certificate._id}`).then((res) => {
            alert("삭제되었습니다!");
            setCertificates((prev)=> prev.filter((item)=>item._id !== certificate._id));
        })
    } 
  }

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{certificate.name}</span>
          <br />
          <span className="text-muted">{certificate.issuingOrganization}</span>
          <br/>
          <span className="text-muted">{certificate.certificatedDate.split('T')[0]}</span>
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

export default CertificateCard;
