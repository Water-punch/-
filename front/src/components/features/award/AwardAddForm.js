import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";
import Calendar from "../../common/calendar/Calendar";

<<<<<<< HEAD
=======

>>>>>>> eee820d44be5b448319f0f1151c169aba601ef48
function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding, setIsVisibility }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 organization 상태를 생성함.
  const [organization, setOrganization] = useState("");
  //useState로 getDate 상태를 생성함.
<<<<<<< HEAD
  const [ getDate, setGetDate ] = useState('');
=======
  const [ getDate, setGetDate ] = useState();
>>>>>>> eee820d44be5b448319f0f1151c169aba601ef48
  //useState로 awardinfo 상태를 생성함.
  const [ awardInfo, setAwardInfo ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post(`${user_id}/awards`, {
      user_id: portfolioOwnerId,
      name,
      organization,
      getDate,
      awardInfo,
    });

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get(`${user_id}/awards`);
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

      <Form.Group controlid="formBasicgetDate" className="mt-3">
        <Form.Label>수상 일자</Form.Label>
<<<<<<< HEAD
          <Calendar
            getDate={getDate}
            setGetDate={setGetDate}
=======
          <Form.Control
            type ="Date"
            value={getDate}
            onChange={(e)=>setGetDate(e.target.value)}
>>>>>>> eee820d44be5b448319f0f1151c169aba601ef48
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

