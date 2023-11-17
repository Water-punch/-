import React, { useCallback, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../utils/api";
import {CertificateAddForm, Certificate}  from "../components/features/certificate";
import '../components/common/UI/MvpCardDesign.css'

function Certificates({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
  const [certificates, setCertificates] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  //useState로 isVisibility 상태를 생성함.
  const [ isVisibility, setIsVisibility ] = useState(true);

  const getUser = useCallback(() => {
    Api.get(`${portfolioOwnerId}/certificates`).then((res) => setCertificates(res.data));
  },[portfolioOwnerId]);

  useEffect(() => {
    getUser();
  }, [getUser, portfolioOwnerId]);


  return (
    <Card className='Body'>
      <Card.Body className="Mvps">
        <Card.Title className="Title">자격증 이력</Card.Title>
        {certificates.map((certificate) => (
          <Certificate
            key={certificate._id}
            certificate={certificate}
            setCertificates={setCertificates}
            isEditable={isEditable}
            setIsVisibility={setIsVisibility}
            portfolioOwnerId={portfolioOwnerId}
          />
        ))}
        {isEditable && isVisibility && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => {
                setIsAdding(true)
                setIsVisibility(false)}}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCertificates={setCertificates}
            setIsAdding={setIsAdding}
            setIsVisibility={setIsVisibility}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;