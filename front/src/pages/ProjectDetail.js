import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import draftjsToHtml from "draftjs-to-html";

const ProjectBox = styled.div`
    background-color: beige;
    width: 70%;
`;

function ProjectDetail( ) {
    const navigate = useNavigate();
    const location = useLocation();
    const project = location.state.project;
    const htmlString = draftjsToHtml(project.editorStateSave[0])
   
    const handleClick = () => {
        navigate("/previous");
    }

    console.log(project)
//여기 와서 api호출
    return (
        <>
            <Col xs lg='1'>
                <Button float='right' onClick={handleClick}>
                    닫기
                </Button>
            </Col>
            <ProjectBox>
                <h1>{project.title}</h1>
                <br />
                <span>{project.startDate} ~ {project.endDate}</span>
                <br />
          {project.content.map(stack => {
            return <span style={{ border: '2px solid black', margin: '2px 3px' }}> {stack} </span>
            })}   
                <br />
                <div dangerouslySetInnerHTML={{ __html: htmlString }} />
            </ProjectBox>
        </>
    )
}

export default ProjectDetail;