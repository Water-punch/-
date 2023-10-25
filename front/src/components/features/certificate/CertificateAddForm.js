import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../utils/api";

function CertificateAddForm({ portfolioOwnerId, setCertificates, setIsAdding, setIsVisibility }) {
  //useState로 title 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 description 상태를 생성함.
  const [issuingOrganization, setIssuingOrganization] = useState("");
  //useState로 certificatedDate 상태를 생성함.
  const [certificatedDate, setCertificatedDate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // portfolioOwnerId를 user_id 변수에 할당함.
  const userId = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post(`${userId}/certificates`, {
      userId,
      name,
      issuingOrganization,
      certificatedDate,
    });


    const res = await Api.get(`${userId}/certificates`);
    // awards를 response의 data로 세팅함.
    setCertificates(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
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

      <Form.Group controlId="formBasicgetsDate" className="mt-3 text-left">
        자격증 획득일
        <Form.Control
            type ="Date"
            value={certificatedDate}
            onChange={(e)=>setCertificatedDate(e.target.value)} />
    </Form.Group>
    
      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3" onClick={()=>setIsVisibility(true)}>
            확인
          </Button>
          <Button variant="secondary" onClick={() => {
            setIsAdding(false)
            setIsVisibility(true)}}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateAddForm;

