import React, { useState } from "react";
import { Button, Form, Col, Row, DropdownButton } from "react-bootstrap";
import * as Api from "../../../utils/api";
import DropdownItem from "react-bootstrap/esm/DropdownItem";


function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding , setIsVisibility }) {
  //useState로 school 상태를 생성함.
  const [school, setSchool] = useState("");
  //useState로 major 상태를 생성함.
  const [major, setMajor] = useState("");
  //useState로 educationLevel 상태를 생성함.
  const [educationLevel, setEducationLevel] = useState("졸업 정보");
  //useState로 StartDate, endDate 상태를 생성함
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    // portfolioOwnerId를 user_id 변수에 할당함.
    const userId = portfolioOwnerId;

    // "education/write" 엔드포인트로 post요청함.
  await Api.post(`${userId}/educations`, {
      userId ,
      school,
      major,
      educationLevel,
      startDate,
      endDate
    });

    // "educationlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get(`${userId}/educations`);
    // awards를 response의 data로 세팅함.
    setEducations(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchool">
        <Form.Label>학교</Form.Label>
        <Form.Control
          type="text"
          placeholder="학교명을 입력하세요."
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공/계열을 입력하세요."
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <br/>
      <Form.Group controlId="formBasicEducationLevel">
          <DropdownButton id="Educationlevel" title={educationLevel} onSelect={(eventKey)=>setEducationLevel(eventKey)}>
            <DropdownItem eventKey="졸업">졸업</DropdownItem>
            <DropdownItem eventKey="재학중">재학중</DropdownItem>
            <DropdownItem eventKey="학사 졸업">학사 졸업</DropdownItem>
            <DropdownItem eventKey="석사 졸업">석사 졸업</DropdownItem>
            <DropdownItem eventKey="박사 졸업">박사 졸업</DropdownItem>
          </DropdownButton>
      </Form.Group>
      <br/>      
      
      <Form.Group controlid="formBasicgetDate" className="mt-3">
          <Form.Label>입학 일자</Form.Label>
          <Form.Control
              type ="Date"
              value={startDate}
              onChange={(e)=>setStartDate(e.target.value)}
          />
          <br/>
          <Form.Label>졸업 일자</Form.Label>
          <Form.Control
              type ="Date"
              value={endDate}
              onChange={(e)=>setEndDate(e.target.value)}
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
    </>
  );
}

export default EducationAddForm;