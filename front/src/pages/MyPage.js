import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row,  Navbar, Nav } from "react-bootstrap";
import { UserStateContext } from "../App";
import * as Api from "../utils/api";
import User from "../components/features/user/User";
import ProfileWrapper from "./ProfileWrapper";
import ProjectWrapper from "./ProjectWrapper";


function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);
  const [selectedContent, setSelectedContent] = useState("project"); // 추가

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    try{
      const res = await Api.get("users", ownerId);
      // 사용자 정보는 response의 data임.
      const ownerData = res.data;
      // portfolioOwner을 해당 사용자 정보로 세팅함.
      setPortfolioOwner(ownerData);
      // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
      setIsFetchCompleted(true);
    }catch(err) {
      navigate('/login');
    }

  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/user<setSelectedC />d" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user._id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  if(!portfolioOwner) {
    return "loading..."
  }

  return (
    <Container fluid>
      <Navbar className="navbar mb-4" expand="xl"  sticky="top" bg= "light" >
        <Container>
          <Navbar.Brand placement="end" onClick={() => navigate("/main")}> {portfolioOwner.name}의 포트폴리오 </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="justify-content-md-end flex-grow-1 p-2 bd-highlight">
              <Nav.Link 
                onClick= {() => {
                  setSelectedContent("project")
                  navigate(`/users/${portfolioOwner._id}`)}} 
                id = "project"
              > 프로젝트 
              </Nav.Link> 
              
              <Nav.Link  
                onClick= {() => { 
                  setSelectedContent("profile")
                  navigate(`/users/${portfolioOwner._id}`)}}
                id = "profile"
              > 개인 이력 
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Row>
          <Col md="3" lg="3">
            <User
              portfolioOwnerId={portfolioOwner._id}
              isEditable={portfolioOwner._id === userState.user?._id}
            />
          </Col>

        { selectedContent === "project" ? (
          <Col>
            <ProjectWrapper
              portfolioOwnerId={portfolioOwner._id}
              portfolioOwner= {portfolioOwner}
              userState={userState}
              navigate={navigate}
            />
          </Col>
          )  : (
          <Col>
            <ProfileWrapper
              portfolioOwnerId={portfolioOwner._id}
              portfolioOwner= {portfolioOwner}
              userState={userState}
              navigate={navigate}
            />
          </Col>
        )}
        </Row>
    </Container>
  );
}

export default MyPage;
