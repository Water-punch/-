import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row, DropdownButton, Stack, Badge } from "react-bootstrap";
import * as Api from "../../../utils/api";
import { Editor } from "react-draft-wysiwyg"; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 
import { EditorState, convertToRaw, ContentState } from "draft-js"; 
import draftjsToHtml from "draftjs-to-html"; 
import htmlToDraft from 'html-to-draftjs'
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import stacksList from "./ProjectStackList";

function ProjectEditForm({ portfolioOwnerId, currentProject, setProjects, setIsEditing, setIsVisibility}) {

  const [title, setTitle] = useState(currentProject.title);
  const [content, setContent] = useState(currentProject.content);
  const [startDate, setStartDate] = useState(currentProject.startDate.split("T")[0]);
  const [endDate, setEndDate] = useState(currentProject.endDate.split("T")[0]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState(draftjsToHtml(currentProject.editorStateSave[0]));
  const [editorStateSave, setEditorStateSave] = useState(currentProject.editorStateSave);
  const entity = editorStateSave[0].entityMap;
  const [imgs, setImgs] = useState(currentProject.imgs);
  const userId = portfolioOwnerId;
  const [deletedImgs, setDeletedImgs] = useState([]);

  useEffect(() => {
    if (imgs.length>1) {
      setImgs(Object.values(entity).map(entityItem => entityItem.data.src));
    }
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
  
  const handleImageDelete = () => {
    const entity = editorStateSave[0].entityMap;
    let deletedImgs = [];

    if (Object.keys(entity).length != 0)  {
      const entityUrls = Object.values(entity).map(entityItem => entityItem.data.src); //entityUrls = 현재 에디터에 있는 이미지
      
      deletedImgs = imgs.filter(url => !entityUrls.includes(url));

      console.log('entityUrls: ' , entityUrls)
      console.log('imgs (삭제 이전):', imgs)
      console.log('deletedIms: ', deletedImgs)
    }
    return deletedImgs
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const entity = editorStateSave[0].entityMap;

    try {
      const deletedImgs = handleImageDelete()

      const entityUrls = Object.values(entity).map(entityItem => entityItem.data.src);

      console.log('imgs (삭제 확인):', imgs)

      if(deletedImgs.length != 0){
        await Api.delImg('projects/uploads',  { deleteItems: deletedImgs });
      };

      await Api.post(`${userId}/projects/${currentProject._id}`, {
        userId,
        title,
        content,
        startDate,
        endDate,
        editorStateSave, 
        imgs : entityUrls,
      })

      const res = await Api.get(`${userId}/projects`);
      setProjects(res.data);
      setIsEditing(false);
    }
    catch(err) {
      console.log('편집요청에 실패했습니다. ')
    }
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
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    console.log(`deletedImgs: ${deletedImgs}`);
    console.log(`imgs : ${imgs}`)
  };

  const addImage = (imgUrl) => {
    setImgs(prevImgs => {
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
      <br/>

      <Form.Group controlId="formBasiccontent" className="mt-3">
        <DropdownButton id="Stacks" title={'기술 스택을 선택해주세요'} onSelect={(eventKey) => setContent((prevContent) => {
          const newContent = [...prevContent, eventKey];
          return newContent; 
        })}>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {stacksList.map((stack, index)=>{
              return (
                <DropdownItem key={`dropdown-stack-${index}`} eventKey={stack}>{stack}</DropdownItem>
              ) 
            })}
          </div>  
        </DropdownButton>
          <br/>
          <Stack direction="horizontal" gap={1}>
            {content.map((stack,index) => 
              <Badge key={`badge-stack-${index}`} bg="secondary">{stack}</Badge>
              )}
            </Stack>
      </Form.Group>


      <Form.Group controlId="formBasicStartDate" className="mt-3">
        <Form.Control
          type='Date'
          placeholder={startDate}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEndDate" className="mt-3">
        <Form.Control
          type="Date"
          placeholder={endDate}
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
        onEditorStateChange={updateTextDescription}
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

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3" onClick={()=>setIsVisibility(true)}>
            확인
          </Button>
          <Button variant="secondary" onClick={() => {
            setIsEditing(false)
            setIsVisibility(true)}}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
