import React, { useState } from "react";
import * as Api from "../api";

function Apitest() {
  const [result, setResult] = useState("");

  const data = {
    title: "project title",
    content: "project content",
    url: "projcet url",
    startDate: "2023-10-02",
    endDate: "2023-10-06",
  };
  Api.get("projects").then((res) => {
    const temp = JSON.stringify(res, null, 2);
    console.log(temp);
    setResult(temp);
  });

  return (
    <div
      style={{ padding: "2rem", border: "3px solid skyblue", margin: "2rem" }}
    >
      <h1>Api 테스트 페이지입니다.</h1>
      <hr />
      <div style={{}}>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default Apitest;
