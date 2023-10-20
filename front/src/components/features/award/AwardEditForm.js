import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";

function AwardEditForm({ currentAward, setAwards, setIsEditing, setIsVisibility}) {
  //useState로 name 상태를 생성함.
  const [ name, setName ] = useState(currentAward.name);
  //useState로 organization 상태를 생성함.
  const [ organization, setOrganization ] = useState(currentAward.organization);
  //useState로 getDate 상태를 생성함.
  const [ getDate, setGetDate ] = useState(currentAward.getDate.split('T')[0]);
  //useState로 awardinfo 상태를 생성함.
  const [ awardInfo, setAwardInfo ] = useState(currentAward.awardInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentAward의 user_id를 user_id 변수에 할당함.
    const user_id = currentAward.userId;

    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`${user_id}/awards/${currentAward._id}`, {
      user_id,
      name,
      organization,
      getDate,
      awardInfo,
    });

    // "awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get(`${user_id}/awards/${currentAward._id}`);
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

      <Form.Group controlid="formBasicgetDate" className="mt-3">
        <Form.Label>수상 일자</Form.Label>
          <Form.Control
            type = "Date"
            placeholder={currentAward.getDate}
            value={getDate}
            onChange={(e)=>setGetDate(e.target.value)}
            />
        </Form.Group>

        <Form.Group controlId="formBasicAwardInfo" className="mt-3">
          <Form.Label>추가사항 (선택)</Form.Label>
          <Form.Control
            type="text"
            placeholder="세부내용"
            value={awardInfo}
            onChange={(e) => setAwardInfo(e.target.value)}
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
