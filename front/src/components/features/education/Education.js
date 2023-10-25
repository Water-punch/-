import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ portfolioOwnerId, education, setEducations, isEditable , setIsVisibility }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EducationEditForm
          currentEducation={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
          setIsVisibility={setIsVisibility}
        />
      ) : (
        <EducationCard
          education={education}
          setEducations={setEducations}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
        />
      )}
    </>
  );
}

export default Education;
