import React, { useState } from "react";
import AwardCard from "../../../hooks/AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ award, setAwards, isEditable, setIsVisibility }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwards={setAwards}
          setIsEditing={setIsEditing}
          setIsVisibility={setIsVisibility}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Award;
