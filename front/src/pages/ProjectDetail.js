import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../api";
import styled from "styled-components";
//import ProjectCard from '..hooks/ProjectCard'

const ProjectBox = styled.div`
    background-color: beige;
    width: 70%;
`;

function ProjectDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState([]);
    useEffect(() => {
        Api.get(`/${userId}/projects/${id}`, id)
        .then((res) => setProject(res.data))
        .catch((error) => {
            console.log('경로틀림?', error);
        })
    }, [id])
    

    return (
        <>
            <Col xs lg='1'>
                <Button onClick={() => navigate('/project')} float='right'>
                    닫기
                </Button>
            </Col>
            <ProjectBox>
                <h1>{project.title}</h1>
                <span className="text-muted">{project.description}</span>
                <br />
                <span>{project.startDate} ~ {project.endDate}</span>
                <br />
                <div>{project.editorState.slice(0, 50)}</div>
            </ProjectBox>
        </>
    )
}

export default ProjectDetail;