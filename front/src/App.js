import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Api from "./utils/api";
import { loginReducer } from "./reducer";
import Header from "./components/common/Header";
import { LoginPage, SearchPortfolios, RegisterPage , MyPage} from "./pages";
import NotFoundPage from "./pages/NotFoundPage";

export const UserStateContext = createContext('');
export const DispatchContext = createContext('');


function App() {

  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get("user/current");
      const currentUser = res.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }

    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Header />
          <Routes>
          <Route path="/" exact element={<MyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/users/:userId" element={<MyPage />} />
            <Route path="/network" element={<SearchPortfolios />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path= "/project" element={ <MyPage/>}/>
            <Route path= "/profile" element={<MyPage/>}/>           
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}


export default App;
