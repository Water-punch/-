import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../utils/api";


function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing, setIsVisibility }) {
  //useState로 title 상태를 생성함.
  const [name, setName] = useState(currentCertificate.name);
  //useState로 description 상태를 생성함.
  const [issuingOrganization, setIssuingOrganization] = useState(currentCertificate.issuingOrganization);
  //useState로 certificatedDate 상태를 생성함.
  const [ certificatedDate, setCertificatedDate ] = useState(currentCertificate.certificatedDate.split('T')[0]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // currentCertificate의 user_id를 user_id 변수에 할당함.
    const userId = currentCertificate.userId;

    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.post(`${userId}/certificates/${currentCertificate._id}`, {
      userId,
      name,
      issuingOrganization,
      certificatedDate,
    });

    

    // "awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get(`${userId}/certificates`);
   
    // awards를 response의 data로 세팅함.
    setCertificates(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="자격증 내역"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicIssuingOrganization" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세 내역"
          value={issuingOrganization}
          onChange={(e) => setIssuingOrganization(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCertificatedDate" className="mt-3 text-center">
        자격증 획득일
        <Form.Control
            type ="Date"
            value={certificatedDate}
            onChange={(e)=>setCertificatedDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3" onClick={()=>setIsVisibility(true)}>
            확인
          </Button>
          <Button variant="secondary" onClick={() => {
            setIsEditing(false)
            setIsVisibility(true)}}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateEditForm;

