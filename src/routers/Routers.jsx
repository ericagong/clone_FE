import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SearchResult from "../pages/SearchResult";
import NotFound from "../pages/NotFound";

// TODO protected router for login
const Routers = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/search/:hashtag' element={<SearchResult />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
