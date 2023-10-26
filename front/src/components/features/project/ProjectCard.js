import { Card , Badge, Stack, ListGroup, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import draftjsToHtml from "draftjs-to-html";
import * as Api from '../../../utils/api';
import { useState } from "react";
import ProjectDetailModal from "../../../pages/ProjectDetailModal";

function ProjectCard({ portfolioOwnerId, setProjects, project, isEditable, setIsEditing }) { 
  const htmlString = draftjsToHtml(project.editorStateSave[0])
  const [modalshow, setModalShow] = useState(false);
  const moveToDetail = () => {
    setModalShow(true)
  }

  const deletecard = async () => {
    if(window.confirm('게시물을 삭제하시겠습니까?')) {
        await Api.delete(`${portfolioOwnerId}/projects/${project._id}`).then((res) => {
            alert("삭제되었습니다!");
            setProjects((prev)=> prev.filter((item)=>item._id !== project._id));
        })
    } 
}

  return (
  <>
    <ProjectDetailModal 
      show={modalshow}
      onHide={()=> setModalShow(false)} 
      project={project}
      htmlString={htmlString}
    />
    <Card className="mb-2 ms-3 mr-5" style={{ width: "25rem" }}>
      <Card.Img onClick={moveToDetail} variant="top" src={project.imgs[0]}/>
      <Card.Body>
        <Card.Title onClick={moveToDetail}>{project.title}</Card.Title>
        <Card.Text onClick={moveToDetail}>{project.editorStateSave[0].blocks[0].text}</Card.Text>
      </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item onClick={moveToDetail}>
            <Stack direction="horizontal" gap={1}>
                <Badge bg="secondary">{project.content[0]}</Badge>
                <Badge bg="secondary">{project.content[1]}</Badge>
                <Badge bg="secondary">{project.content[2]}</Badge>
            </Stack>
          </ListGroup.Item>
          <ListGroup.Item onClick={moveToDetail}>
            {project.startDate.split('T')[0]}~{project.endDate.split('T')[0]}
          </ListGroup.Item>
          <ListGroup.Item>
            {isEditable && (
              <Stack direction="horizontal" gap={1} className="justify-content-center">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="mr-3"
                >
                  편집
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deletecard()}
                  className="mr-3"
                >
                  삭제
                </Button>
              </Stack>
              )}
          </ListGroup.Item>
        </ListGroup>
    </Card>
  </>
  );
}

export default ProjectCard;
