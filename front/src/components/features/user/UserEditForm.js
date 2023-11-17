import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../../utils/api";

function UserEditForm({ user, setIsEditing, setUser }) {

  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);
  const [ imgUrl, setImgUrl ] = useState(user.imgUrl);

  const SubmitImg = async (e) => {
    e.preventDefault();
    const img = e.target.files[0];

    const res2 = await Api.imgpost(`users/${user._id}/uploads`, img);
    const newImgUrl = res2.data.imagePath;
    setImgUrl(newImgUrl);
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.put(`users/${user._id}`, {
      name,
      description,
      imgUrl,
    });

    const updatedUser = res.data;
    setUser(updatedUser);

    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
          <Row className="justify-content-md-center">
            <Card.Img
              style={{ width: "10rem", height: "8rem", borderRadius: "50%" }}
              className="mb-3"
              src={imgUrl}
              alt="유저 프로필 이미지"
            />
          </Row>
          <Form.Group encType='multipart/form-data' controlId="useProfileImg" className="mb-3">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={SubmitImg}
            />
          </Form.Group>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={user.email}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
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
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
