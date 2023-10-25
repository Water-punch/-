import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ portfolioOwnerId, project, setProjects, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          portfolioOwnerId={portfolioOwnerId}
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
          setProjects={setProjects}
        />
      )}
    </>
  );
}

export default Project;
