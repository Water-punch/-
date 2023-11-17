import { Button, Modal, Stack, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UserStateContext } from "../App.js";
import { useContext } from "react";

function ProjectDetailModal({show, onHide, project, htmlString, isEditable }) {
    const navigate = useNavigate();
    const params = useParams();
    const userState = useContext(UserStateContext);
    const currentId = userState.user ? userState.user._id : "";

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>프로젝트 상세보기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>{project.title}</h2>
                <hr className="my-2"/>
                <Stack direction="horizontal" gap={1}>
                    {project.content.map((stack,index) => 
                    <Badge key={`stacks-badge-${index}`}bg="secondary">{stack}</Badge>
                    )}
                </Stack>
                <hr className="my-2"/>
                {project.startDate.split('T')[0]}~{project.endDate.split('T')[0]}
                <hr className="my-2"/>
                <div dangerouslySetInnerHTML={{ __html: htmlString }} />
            </Modal.Body>
            <Modal.Footer>
                {currentId !== project.userId && !params.userId && (
                    <Button variant="primary" onClick={()=> navigate(`/users/${project.userId}`)}>
                        프로젝트 더 보기
                    </Button>
                )}
                {currentId === project.userId && !isEditable && (
                    <Button variant="success" disabled>
                        나의 프로젝트 입니다!
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ProjectDetailModal;