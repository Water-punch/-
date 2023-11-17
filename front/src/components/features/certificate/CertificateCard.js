import { Button, Row, Col } from "react-bootstrap";
import * as Api from '../../../utils/api';
import '../../common/UI/MvpCardDesign.css'

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
    <>
      <Row className="align-items-center">
        <Col className='Cards'>

          <span>자격증명: {certificate.name}</span>
          <br />
          <span className="text-muted">발급기관: {certificate.issuingOrganization}</span>
          <br/>
          <span className="text-muted">획득일: {certificate.certificatedDate.split('T')[0]}</span>

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
    </>
  );
}

export default CertificateCard;
