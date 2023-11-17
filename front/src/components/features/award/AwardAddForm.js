import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../utils/api";


function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding, setIsVisibility }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 organization 상태를 생성함.
  const [organization, setOrganization] = useState("");
  //useState로 awardedDate 상태를 생성함.

  const [ awardedDate, setAwardedDate ] = useState('');

  //useState로 Info 상태를 생성함.
  const [ Info, setInfo ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 userId 변수에 할당함.
    const userId = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post(`${userId}/awards`, {
      userId,
      name,
      organization,
      awardedDate,
      Info,
    });

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get(`${userId}/awards`);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>수상정보</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상명"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicOrganization" className="mt-3">
        <Form.Control
          type="text"
          placeholder="수여기관"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlid="formBasicawardedDate" className="mt-3">
        <Form.Label>수상 일자</Form.Label>

          <Form.Control
            type ="Date"
            value={awardedDate}
            onChange={(e)=>setAwardedDate(e.target.value)}
            />
        </Form.Group>

        <Form.Group controlId="formBasicInfo" className="mt-3">
          <Form.Label>추가사항 (선택)</Form.Label>
          <Form.Control
            type="text"
            placeholder="세부내용"
            value={Info}
            onChange={(e) => setInfo(e.target.value)}
          />
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

export default AwardAddForm;

