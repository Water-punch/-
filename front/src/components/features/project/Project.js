import React, { useState } from "react";
import ProjectCard from "../../../hooks/ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ project, setProjects, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  //여기에 isdetailed , setisdetailed 초기값 false 넣고? card에서 클릭하면 true로 .. 아니 필요없지?
  //const [isDetailed, setIsDetailed] = useState(false)
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Project;
