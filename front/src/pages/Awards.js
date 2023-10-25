import React, { useCallback, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../utils/api";
import {Award,AwardAddForm} from "../components/features/award";

function Awards({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
  const [awards, setAwards] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  //useState로 isVisibility 상태를 생성함.
  const [ isVisibility, setIsVisibility ] = useState(true);

  const getUser = useCallback(() => {
    Api.get(`${portfolioOwnerId}/awards`).then((res) => setAwards(res.data));    
  },[portfolioOwnerId]);

  useEffect(() => {
    getUser();
  }, [getUser, portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => (
          <Award
            key={award._id}
            award={award}
            setAwards={setAwards}
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
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setIsAdding={setIsAdding}
            setIsVisibility={setIsVisibility}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;
