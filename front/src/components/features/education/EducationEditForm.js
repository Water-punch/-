import React, { useState } from "react";
import { Button, Form, Col, Row, DropdownButton } from "react-bootstrap";
import * as Api from "../../../api";
import DropdownItem from "react-bootstrap/esm/DropdownItem";


function EducationEditForm({ currentEducation, setEducations, setIsEditing , setIsVisibility }) {
  //useState로 school 상태를 생성함.
  const [school, setSchool] = useState(currentEducation.school);
  //useState로 major 상태를 생성함.
  const [major, setMajor] = useState(currentEducation.major);
  //useState로 educationLevel 상태를 생성함.
  const [educationlevel, setEducationlevel] = useState(currentEducation.educationlevel);
  //useState로 startDate,endDate 상태를 생성함.
  const [ startDate, setStartDate ] = useState(currentEducation.startDate.split('T')[0]);
  const [ endDate, setEndDate ] = useState(currentEducation.endDate.split('T')[0]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = currentEducation.userId;

    // "education/유저id" 엔드포인트로 put 요청함.
    await Api.put(`${user_id}/educations/${currentEducation._id}`, {
      user_id,
      school,
      major,
      educationlevel,
      startDate,
      endDate,
    });

    // "educationlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get(`${user_id}/educations/${currentEducation._id}`);
    // educations를 response의 data로 세팅함.
    setEducations(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
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
          <DropdownButton id="Educationlevel" title={educationlevel} onSelect={(eventKey)=>setEducationlevel(eventKey)}>
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
              placeholder={startDate}
              onChange={(e)=>setStartDate(e.target.value)}
          />
          <br/>
          <Form.Label>졸업 일자</Form.Label>
          <Form.Control
              type ="Date"
              value={endDate}
              placeholder={endDate}
              onChange={(e)=>setEndDate(e.target.value)}
          />
        </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3" onClick={()=>setIsVisibility(true)}>
            확인
          </Button>
          <Button variant="secondary" onClick={() => {
            setIsEditing(false)
            setIsVisibility(true)
            }}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;
