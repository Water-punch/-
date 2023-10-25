import { useState } from 'react';
import axios from 'axios';
import { Form } from "react-bootstrap";

const backendPortNumber = "5001";
const serverUrl =
    "http://" + window.location.hostname + ":" + backendPortNumber + "/";

export default function ImageUpload({user}) {

    const [img, setImg] = useState("")

    const formSubmit = async (e) => {
        e.preventDefault();

        setImg(e.target.files[0]);
        const formData = new FormData();
        formData.append('image', img );

        await axios.post(serverUrl +`users/${user._id}/uploads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            console.log('이미지 전송 요청 성공');
        }).catch(err => {
            console.log('이미지 전송 요청 실패');
        })
    }

        return (
        <>
            <div className="img-preview">
            <Form.Group encType='multipart/form-data' controlId="useProfileImg" className="mb-3">
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => formSubmit(e)}
                />
            </Form.Group>

            </div>
        </>
        );
    }