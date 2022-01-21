import "./App.css";
import { useContext } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Navbar } from "./Navbar";
import { StateProvider, StateContext } from "./StateProvider";

// import { initializeApp, getAnalytics } from "firebase";
// import firebaseConfig from "./firebase-config";
function App() {
  const { username, setUsername } = useContext(StateContext);
  return (
    <StateProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/chat" element={<Chat></Chat>}></Route>
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
