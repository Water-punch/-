import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import * as Api from "../utils/api";
import Project from "../components/features/project/Project";
import Pagination from "../components/features/pagination/Pagination";

export function SearchPortfolios() {
  //searching 관련 state
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  //paging 관련 state
  const [projects, setProjects] = useState([]); //프로젝트 data
  const [page, setPage] = useState(1); //현재 페이지
  const [searchPage, setSearchPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const listPerPage = 6;
  // const totalPage = Math.ceil(projects.length/listPerPage);

  const getProjects = () => {
    const project = Api.get(`projects`).then((res) => {
      console.log(res.data);
      setProjects(res.data);
      setSearchResult(res.data);
    });
  };

  useEffect(() => {
    const lastPage = Math.ceil(projects.length / listPerPage);
    setTotalPage(lastPage ? lastPage : 1);
  }, [projects]);

  useEffect(() => {
    getProjects();
  }, []);

  // const paginate = (pageNum) => setCurrentPage(pageNum); //현재 페이지를 변경하는 함수

  const handlePageChange = useCallback((pageNum) => {
    setPage(pageNum);
  }, []);

  // 한페이지에 보여주는 prj data 인덱스
  const pagingProjects = projects.slice(
    (page - 1) * listPerPage,
    page * listPerPage
  );

  const searchHandler = (e) => {
    const input = e.target.value.toLowerCase();
    if (input == "") setSearchResult(projects);

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

  const newSearchResult = searchResult;

  useEffect(() => {
    const lastPage = Math.ceil(newSearchResult.length / listPerPage);
    setSearchPage(lastPage ? lastPage : 1);
  }, []);

  // const searchPage =

  const searchPaging = newSearchResult.slice(
    (searchPage - 1) * listPerPage,
    searchPage * listPerPage
  );

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
        <Form>
          <Row>
            <Col className="d-flex">
              <Form.Control
                style={{ width: "400px" }}
                type="text"
                placeholder="Search"
                className="me-2"
                onChange={searchHandler}
                onClick={() => {
                  setIsSearching(true);
                }}
              />
            </Col>
          </Row>
        </Form>
      </Row>
      <>
        <Row className="justify-content-center">
          {isSearching
            ? searchPaging.map((project) => (
                <Project
                  key={project._id}
                  project={project}
                  pagingProjects={pagingProjects}
                />
              ))
            : pagingProjects.map((project) => (
                <Project
                  key={project._id}
                  project={project}
                  pagingProjects={pagingProjects}
                />
              ))}
        </Row>
      </>
      <Pagination
        page={page}
        listPerPage={listPerPage}
        totalPage={totalPage}
        setPage={setPage}
        handlePageChange={handlePageChange}
      />

      {/* 
      activePage={page} // 현재 페이지
      itemsCountPerPage={10} // 한 페이지에 보여줄 아이템 갯수
      totalItemsCount={450} // 총 아이템 갯수
      pageRangeDisplayed={5} // paginator의 페이지 범위
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수 */}
    </Container>
  );
}

export default SearchPortfolios;
