import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row, DropdownButton } from "react-bootstrap";
import * as Api from "../../../utils/api";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg"; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 
import { EditorState, convertToRaw, ContentState } from "draft-js"; 
import draftjsToHtml from "draftjs-to-html"; 
import htmlToDraft from 'html-to-draftjs'
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import stacksList from "./ProjectStackList";

// //텍스트에디터 출력 확인 공간
// const RowBox = styled.div` 
// width: 100%;
// display: flex;
// `;

// const Viewer = styled.div` 
// width: 50%;
// height: 400px;
// padding: 20px;
// margin-top: 20px;
// border: 2px solid gray;
// `;

function ProjectEditForm({ portfolioOwnerId, currentProject, setIsEditing }) {

  const [title, setTitle] = useState(currentProject.title);
  const [content, setContent] = useState(currentProject.content);
  const [startDate, setStartDate] = useState(currentProject.startDate);
  const [endDate, setEndDate] = useState(currentProject.endDate);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState(draftjsToHtml(currentProject.editorStateSave[0]));
  const [editorStateSave, setEditorStateSave] = useState(currentProject.editorStateSave);
  const [imgs, setImgs] = useState(currentProject.imgs);
  const userId = portfolioOwnerId;

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlString);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); 
  
    // const contentState = editorState.getCurrentContent();
  
    //    // 1) 업로드해놓고 혹시 삭제한 이미지가 있는지 조회 
    // const content = {
    //   text: contentState.getPlainText(),
    //   images: contentState.getEntityMap().get('IMAGE').map(entity => entity.getData().get('link')),
    // };

    // // 2) 삭제한 이미지가 있다면 imgs에서 url 삭제
    // const newImgs = contentState.getEntityMap().get('IMAGE').map(entity => entity.getData().get('link'));
    
    await Api.post(`${userId}/projects`, {
      userId,
      title,
      content,
      startDate,
      endDate,
      editorStateSave, 
      imgs,
    });
  
     // const res = await Api.get(`${userId}/projects`); 
    // setProjects(res.data);
    setIsEditing(false);
  };

  const updateTextDescription = (state) => {
    setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
    setEditorStateSave(() => {
      const newStateSave = editorStateSave;
      newStateSave[0] = convertToRaw(editorState.getCurrentContent())
      return newStateSave;
    })
  };

  const uploadCallback = async (file) => { //공식문서에서 promise 객체 반환하라고 함
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);
      try { 
        const response = Api.postImg(`projects/uploads`, formData);
        resolve({ data: { link: response.data.imageUrl } })
        .then(setImgs(() => {
          const imgUrl = response.data.imageUrl;
          const newImgs = [...imgs]
          newImgs.push(imgUrl)
          return newImgs;
        }));
      } catch (error) {
        reject('이미지 업로드 실패');
      }
    });
  };

  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
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
            {stacksList.map((stack)=>{
              return (
                <DropdownItem eventKey={stack}>{stack}</DropdownItem>
              ) 
            })}
          </div>  
        </DropdownButton>
          <br/>
          {content.map(stack => {
            return <span style={{ border: '2px solid black', margin: '2px 3px' }}>      {stack} </span>
            })}   
      </Form.Group>


      <Form.Group controlId="formBasicStartDate" className="mt-3">
        <Form.Control
          type='Date'
          placeholder="프로젝트 시작일"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEndDate" className="mt-3">
        <Form.Control
          type="Date"
          placeholder="프로젝트 종료일"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>

      <br />
      <div>프로젝트 상세내용</div>
      <div className="text-muted">첫 번째 사진이 대표사진으로 등록됩니다.</div>
      <br />
      
      <Editor
        placeholder="상세내용을 입력해주세요"
        editorState={editorState}
        onEditorStateChange={updateTextDescription}
        toolbar={{
        image: { uploadCallback },
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

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;