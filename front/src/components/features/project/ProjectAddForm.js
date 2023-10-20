import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg"; //라이브러리 사용하려고
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; //라이브러리 사용하려고
import { EditorState, convertToRaw } from "draft-js"; //1. EditorState: 객체. obj, editor 상태의 snapshot? 컨텐츠, 커서, undo/redo정보 등 포함
//2.convertToRaw: editorState 객체가 주어지면 원시 js 구조로 변환
import draftjsToHtml from "draftjs-to-html"; //원시 JS 구조를 HTML로 변환(객체가 보이도록 HTML로 변환)

//텍스트에디터 출력 확인 공간
const RowBox = styled.div`
width: 100%;
display: flex;
`;

const Viewer = styled.div` //test창
width: 50%;
height: 400px;
padding: 20px;
margin-top: 20px;
border: 2px solid gray;
`;

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //비어있는 ContentState 기본 구성으로 새 개체를 반환. 나중에 상태값을 변경하기 위함
  const [editorSave, setEditorSave] = useState(null)
  console.log('1. editorState 초기값 addform 열릴때, 2.값 입력되고 64,65,66,68 실행이후 다시 등장. 3. 한번 더 반복. 왜?' + JSON.stringify(editorState))
  const [htmlString, setHtmlString] = useState(""); //test용

  const inputAdder = () => {
    setEditorSave(() => {
      editorSave += editorState
    }); 
    console.log(setEditorSave)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId; // portfolioOwnerId를 user_id 변수에 할당함.
    const convertedEditorState = convertToRaw(editorState.getCurrentContent());
    // 1. getCurrentContent(): immutable 객체를 ContentState로 만듬
    // 2. convertToRaw로 blockMap과 entityMap만 추출(api로 보내기위해 다듬는 과정)

    await Api.post(`${user_id}/projects`, {
      user_id: portfolioOwnerId,
      title,
      content,
      startDate,
      endDate,
      editorState : convertedEditorState
    });

    console.log('convertedEditorState : post 보내는 값' + convertedEditorState)

    const res = await Api.get(`${user_id}/projects`);
    setProjects(res.data);
    setIsAdding(false);
  };

  const updateTextcontent = (state) => { //View를 위해 상태값을 HTML로 변환하는 과정
    setEditorState(state);
    console.log('updateTextcontent 실행. editorState = ', setEditorState(state))
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent())); //1.immutable 객체를 getCurrentContent()로 ContentState로 만듬.
    //2. convertToRaw로 ContentState의 blockMap과 entityMap만 추출
    //3.에디터로 작성한 상태값을 HTML태그로 변환
    console.log('editorState에서 ContentState로 변환, editorState.getCurrentContent() = ' + editorState.getCurrentContent())
    console.log('ContentState를 convertToRaw로 원시 js로 변환(blockMap, entityMap 추출된 상태), convertToRaw(editorState.getCurrentContent()) = ' + JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    setHtmlString(html);
    console.log('<보이는 값>원시 js를 html로, html = ' + html)
    inputAdder();
  };

  const uploadCallback = async (file) => {
    try {
      const user_id = portfolioOwnerId;
      const formData = new FormData(); // 객체, 전송용?
      formData.append('image', file); // 키 : 밸류. 객체에 파일추가
      const response = await Api.post(`${user_id}/projects`, formData); //응답 저장
      const imageUrl = response.data.imageUrl; //응답 처리: response에서 imageUrl 추출. 
      console.log('사진 업로드')
      return imageUrl;
    } catch (error) {
      throw new Error('사진 업로드 실패');
    }
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
        <Form.Control
          type="text"
          placeholder="프로젝트 요약 및 기술스택을 입력하세요"
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        />
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
      <div className="text-muted">첫 번째 사진이 대표사진으로 등록됩니다.</div>
      <br />
      
      <Editor
        placeholder="상세내용을 입력해주세요"
        editorState={editorState}
        onEditorStateChange={updateTextcontent}
        toolbar={{
        image: { uploadCallback},
        }}
        localization={{ locale: "ko" }}
        editorStyle={{
        height: "400px",
        width: "100%",
        border: "3px solid lightgray",
        }}
      />

      <RowBox>
        <Viewer dangerouslySetInnerHTML={{ __html: htmlString }} />
        <Viewer>{htmlString}</Viewer>
      </RowBox>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
