import React, { useCallback, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../utils/api";
import { Project, ProjectAddForm } from '../components/features/project'

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const getUser = useCallback(() => {
    Api.get(`${portfolioOwnerId}/projects`).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);

  useEffect(() => {
    getUser();
  }, [getUser, portfolioOwnerId]);


  return (  //추가, 편집 중에 버튼 안보이게, line 27

    <Card className="overflow-auto" >
      <Card.Body>
      <Card.Title>프로젝트</Card.Title>
        <Col >
        {isEditable && !isAdding && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)} >+</Button>
            </Col>
          </Row>
        )}

      <Row className="justify-content-center">
        {projects.map((project) => (
          <Project
            portfolioOwnerId={portfolioOwnerId}
            key={project._id}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
      </Row>
      
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
        </Col>
      </Card.Body>
    </Card>
  );
}

export default Projects;