import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../api";
import {CertificateAddForm, Certificate}  from "../components/features/certificate";

function Certificates({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
  const [certificates, setCertificates] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  //useState로 isVisibility 상태를 생성함.
  const [ isVisibility, setIsVisibility ] = useState(true);

  useEffect(() => {
    Api.get(`${portfolioOwnerId}/certificates`).then((res) => setCertificates(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증 이력</Card.Title>
        {certificates.map((certificate) => (
          <Certificate
            key={certificate._id}
            certificate={certificate}
            setCertificates={setCertificates}
            isEditable={isEditable}
            setIsVisibility={setIsVisibility}
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