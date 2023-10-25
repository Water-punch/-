import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../utils/api";

function AwardEditForm({ currentAward, setAwards, setIsEditing, setIsVisibility}) {
  //useState로 name 상태를 생성함.
  const [ name, setName ] = useState(currentAward.name);
  //useState로 organization 상태를 생성함.
  const [ organization, setOrganization ] = useState(currentAward.organization);
  //useState로 awardedDate 상태를 생성함.
  const [ awardedDate, setAwardedDate ] = useState(currentAward.awardedDate.split('T')[0]);

  const [ Info, setInfo ] = useState(currentAward.Info);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentAward의 userId를 userId 변수에 할당함.
    const userId = currentAward.userId;

    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.post(`${userId}/awards/${currentAward._id}`, {
      userId,
      name,
      organization,
      awardedDate,
      Info,
    });

 
    const res = await Api.get(`${userId}/awards`);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
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

      <Form.Group controlid="formBasicsetAwardedDate" className="mt-3">
        <Form.Label>수상 일자</Form.Label>

          <Form.Control
            type = "Date"
            placeholder={currentAward.awardedDate}
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

export default AwardEditForm;
