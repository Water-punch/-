import React from "react";
import Projects from './Projects'
// import { UserStateContext } from "../App";



function ProjectWrapper ({portfolioOwnerId, portfolioOwner, userState, navigate}) {
    if (!portfolioOwnerId) {
        navigate("/login", { replace: true });
        return ;
 }
return (
<Projects
portfolioOwnerId={portfolioOwner._id}
isEditable={portfolioOwner._id === userState.user?._id}
/>  
)

}

export default ProjectWrapper;
