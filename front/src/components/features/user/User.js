import React, { useState, useEffect, useCallback } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../../utils/api";


function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState('');

  const getUser = useCallback(() => {
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  },[portfolioOwnerId]);

  useEffect(() => {
    getUser();
  }, [getUser, portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default User;
