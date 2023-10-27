import React, { useState } from "react";
import { Button, Form, Col, Row, DropdownButton, Stack, Badge } from "react-bootstrap";
import * as Api from "../../../utils/api";
import { Editor } from "react-draft-wysiwyg"; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js"; 
import draftjsToHtml from "draftjs-to-html"; 
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import stacksList from "./ProjectStackList";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding, setIsVisibility }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); 
  const [htmlString, setHtmlString] = useState(""); 
  const [imgs, setImgs] = useState(["https://portfolio-ebak.s3.ap-northeast-2.amazonaws.com/Public/project_default.png"]);
  const [editorStateSave, setEditorStateSave] = useState([]);
  const userId = portfolioOwnerId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    await Api.post(`${userId}/projects`, {
      userId,
      title,
      content,
      startDate,
      endDate,
      editorStateSave, 
      imgs,
    });
  
    const res = await Api.get(`${userId}/projects`);
    setProjects(res.data);
    setIsAdding(false);
  };
  
  const updateTextcontent = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
    setEditorStateSave(() => {
      const newEditorStateSave = editorStateSave;
      newEditorStateSave[0] = convertToRaw(editorState.getCurrentContent());
      return newEditorStateSave;
    })
  };

  const addImage = (imgUrl) => {
    setImgs((prevImgs) => {
      return [...prevImgs, imgUrl];
      });
  };

  const isUrl = (str) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    return urlPattern.test(str);
  }

  const uploadCallback = async (file) => { 
    return new Promise(async (resolve, reject) => {
      if (typeof file === 'string' && isUrl(file)) {
        addImage(file);
        resolve({ data: { link: file } });
      } else if (file instanceof File) {
          const formData = new FormData();
          formData.append('image', file);
          try { 
            const response = await Api.postImg(`projects/uploads`, formData);
            const imgUrl = response.data.imagePath;
            addImage(imgUrl);
            resolve({ data: { link: imgUrl } });
          } catch (error) {
              reject('이미지 업로드 실패');
            }
        } 
      });
    };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <br/>
        <h2>프로젝트 제목을 입력하세요</h2>
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasiccontent" className="mt-3">
        <DropdownButton id="Stacks" title={'기술 스택을 선택해주세요'} onSelect={(eventKey) => setContent((prevContent) => {
          const newContent = [...prevContent, eventKey];
          return newContent; 
        })}>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {stacksList.map((stack,index)=>{
              return (
                <DropdownItem key={`dropdown-stack-${index}`} eventKey={stack}>{stack}</DropdownItem>
              ) 
            })}
          </div>  
        </DropdownButton>
          <br/>
          <Stack direction="horizontal" gap={1}>
            {content.map((stack, index) => 
              <Badge key={`badge-stack-${index}`} bg="secondary">{stack}</Badge>
              )}
            </Stack> 
      </Form.Group>

      <Form.Group controlId="formBasicStartDate" className="mt-3">
        <br />
        <span className="text-muted">프로젝트 시작일을 입력해주세요</span>
        <Form.Control
          type='Date'
          placeholder="프로젝트 시작일"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br />
        <span className="text-muted">프로젝트 종료일을 입력해주세요</span>
        <Form.Control
          type='Date'
          placeholder="프로젝트 종료일"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>

      <br />
      <div>프로젝트 상세내용</div>
      <br />
      
      <Editor
        placeholder="상세내용을 입력해주세요"
        editorState={editorState}
        onEditorStateChange={updateTextcontent}
        toolbar={{
        image: { uploadCallback, previewImage: true, },
        }}
        localization={{ locale: "ko" }}
        editorStyle={{
        height: "400px",
        width: "100%",
        border: "3px solid lightgray",
        }}
      />

      {/* <RowBox>
        <Viewer dangerouslySetInnerHTML={{ __html: htmlString }} />
        <Viewer>{htmlString}</Viewer>
      </RowBox> */}

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3" onClick={()=>setIsVisibility(true)}>
            확인
          </Button>
          <Button variant="secondary" onClick={() => {
            setIsAdding(false)
            setIsVisibility(true)}}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
