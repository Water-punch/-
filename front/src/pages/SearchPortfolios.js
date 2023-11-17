import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import * as Api from "../utils/api";
import Project from "../components/features/project/Project";

function SearchPortfolios() {
  const [projects, setProjects] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const getProjects = () => {
    Api.get("projects").then((res) => {
      setProjects(res.data);
      setSearchResult(res.data);
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const searchHandler = (e) => {
    const input = e.target.value.toLowerCase();
    if (input === "") setSearchResult(projects);
    setSearchResult(() => {
      const newResult = projects;
      return newResult.filter((project) => {
        const contentArray = project.content;
        return contentArray.some((stack) =>
          stack.toLowerCase().includes(input)
        );
      });
    });
  };

  return (
    <Container fluid>
      <Row>
        <img
          src="https://portfolio-ebak.s3.ap-northeast-2.amazonaws.com/Project/1698393779005_%C3%AB%C2%B0%C2%B0%C3%AB%C2%84%C2%88.png"
          alt="배너이미지"
        />
      </Row>
      <Row
        xs="auto"
        className="justify-content-center align-items-center mt-4 mb-4"
        style={{ height: "200px", width: "100%" }}
      >
        <Col className="d-flex">
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="기술 스택으로 프로젝트를 검색하세요."
              style={{ width: "40rem" }}
              onChange={searchHandler}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {searchResult.map((project) => (
          <Project key={project._id} project={project} />
        ))}
      </Row>
    </Container>
  );
}

export default SearchPortfolios;
