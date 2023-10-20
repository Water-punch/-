import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project, isEditable, setIsEditing }) { 
  const navigate = useNavigate();
  
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col onClick={ () => navigate('/project/detail')}>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.content}</span>
          <br />
          <span>{project.startDate} ~ {project.endDate}</span>
          <br />
          {/* <div>{project.editorState}</div> */}
          
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
