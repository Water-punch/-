// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Form, Col, Row } from "react-bootstrap";
// import * as Api from "../api";
// import styled from "styled-components";

// const ProjectBox = styled.div`
//     background-color: beige;
//     width: 70%;
// `;

// function ProjectDetail() {
//     const navigate = useNavigate();
//     const [project, setProject] = useState([]);
//     // useEffect(() => {
//     //     Api.get(`${user_id}/projects/${currentProject.id}`)
//     //     .then((res) => setProject(res.data))
//     //     .catch((error) => {
//     //         console.log('경로틀림?', error);
//     //     })
//     // }, [id])
    

//     return (
//         <>
//             <Col xs lg='1'>
//                 <Button onClick={() => navigate('/:userId/projects')} float='right'>
//                     닫기
//                 </Button>
//             </Col>
//             <ProjectBox>
//                 <h1>{project.title}</h1>
//                 <span className="text-muted">{project.description}</span>
//                 <br />
//                 <span>{project.startDate} ~ {project.endDate}</span>
//                 <br />
//                 <div>{project.editorState}</div>
//             </ProjectBox>
//         </>
//     )
// }

// export default ProjectDetail;