import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import { Register } from "./pages/Register";
import { Management } from "./pages/Management";
import { useState } from "react";

function App() {
  const [userLogged, setUserLogged] = useState("");
  const setUserLoggedTrueHandler = (email) => {
    setUserLogged(email);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogIn setUserLoggedTrueHandler={setUserLoggedTrueHandler} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/management" element={<Management userLogged={userLogged} />} />
    </Routes>
  );
}

export default App;
