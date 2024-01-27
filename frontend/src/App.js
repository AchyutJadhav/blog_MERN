import Home from "./pages/Home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Setting from "./pages/Settings/Setting";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  // console.log(user);

  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <TopBar />
        <switch>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/write" element={user ? <Write /> : <Home />} />
          <Route path="/setting" element={user ? <Setting /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
        </switch>
      </Router>
    </>
  );
}

export default App;
