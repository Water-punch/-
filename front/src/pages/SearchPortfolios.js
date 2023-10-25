import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import * as Api from "../utils/api";
import UserCard from "../components/features/user/UserCard";
import ProjectCard from "../components/features/project/ProjectCard";
import { UserStateContext } from "../App";

function SearchPortfolios() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [stackName, setStackName] = useState('');
  // useEffect(() => {
  //   // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
  //   if (!userState.user) {
  //     navigate("/login");
  //     return;
  //   }
  //   // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
  //   Api.get("userlist").then((res) => setUsers(res.data));
  // }, [userState, navigate]);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    Api.get("userlist").then((res) => setUsers(res.data)); 
    Api.get("projects").then((res) => setProjects(res.data));
  }, [projects, userState, navigate]);

  const searchHandler = (e) => {
    setStackName(e.target.value);
  };

  const clickHandler = () => {
    setSearchResult(projects.filter((project) => { //project하나당 조회. 맞는 프로젝트 배열에 저장
      if(project.content.forEach((stack) => stack === stackName)) { //project의 content안에 stackName있냐?
        return project //있으면 저장
      } else {
        throw new Error('일치하는 프로젝트가 없습니다.');
      }
    })) 
    setStackName(''); // 검색한거 초기화
  };

  return (
    <Container fluid>
      <Row xs="auto" className="justify-content-center align-items-center mt-4 mb-4" style={{height: '200px', width: '100%'}}>
        <Form>
          <Row>
            <Col className="d-flex">
              <Form.Control
                style={{width: '50%'}}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={searchHandler}
              />
              <Button variant="outline-success" type='submit' onClick={clickHandler}>Search</Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="justify-content-center">
        {users.map((user) => (
          <UserCard key={user._id} user={user} isNetwork />
        ))}
        {searchResult.map((project) => (
          <ProjectCard project={project} />
        ))}
      </Row>
    </Container>
  );
}

export default SearchPortfolios;
