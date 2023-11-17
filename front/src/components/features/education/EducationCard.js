import { Button, Row, Col } from "react-bootstrap";
import * as Api from '../../../utils/api';
import '../../common/UI/MvpCardDesign.css'

function EducationCard({ portfolioOwnerId, setEducations, education, isEditable, setIsEditing }) {


    const deletecard = async () => {
        if(window.confirm('게시물을 삭제하시겠습니까?')) {
            await Api.delete(`${portfolioOwnerId}/educations/${education._id}`).then((res) => {
                alert("삭제되었습니다!");
                setEducations((prev)=> prev.filter((item)=>item._id !== education._id));
            })
        } 
    }

    return (
        <>
            <Row className="align-items-center">
                <Col className='Cards'>
                    <span>학교명: {education.school}</span>
                    <br />
                    <span>전공/계열: {education.major} ({education.educationLevel})</span>
                    <br />
                    <span className="text-muted">{education.startDate.split('T')[0]}~{education.endDate.split('T')[0]}</span>
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
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deletecard()}
                            className="mr-3"
                            >
                            삭제
                        </Button>
                    </Col>
                )}
            </Row>
        </>
    );
}

export default EducationCard;