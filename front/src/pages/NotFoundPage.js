import React from "react";
import {Container, Button} from "react-bootstrap";
import imgnotFound from './notfound.png';




const NotFoundPage = () => {
  return (
    <Container className={"text-center"} fluid>
     <Button href="/network" variant="info" > 
      <a className="fs-3 text-light" >메인 페이지로 돌아가기</a>
    </Button >
    
    <br></br>
    <br></br>

    <div className="bg-warning-subtle ">
    <img src={imgnotFound} 
    className="img-fluid"
    style={{ width : '900px', height: '700px'}}
    fluid alt= "notfound"
     />
    </div>

    </Container>
    )
};

export default NotFoundPage;
