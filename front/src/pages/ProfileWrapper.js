import React from "react";
import { Container } from "react-bootstrap";
import Educations from './Educations';
import Awards from "./Awards";
import Certificates from "./Certificates";

function ProfileWrapper ({portfolioOwnerId,portfolioOwner, userState, navigate}) {
    if (!portfolioOwnerId) {
        navigate("/login", { replace: true });
        return;
    }
    return (
    <Container>
    <Awards
    portfolioOwnerId={portfolioOwner._id}
    isEditable={portfolioOwner._id === userState.user?._id}
    />  
    <Educations
    portfolioOwnerId={portfolioOwner._id}
    isEditable={portfolioOwner._id === userState.user?._id}
    />  
    <Certificates
    portfolioOwnerId={portfolioOwner._id}
    isEditable={portfolioOwner._id === userState.user?._id}
    />  
    </Container>

    )
}

export default ProfileWrapper;
