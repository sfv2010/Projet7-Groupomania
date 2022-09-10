import React from "react";
import Home from "./pages/home/Home";
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:username" element={<Profile />} />
            </Routes>
        </Router>
    );
};
// export const App = () => {
//     return <Login />;
// };
export default App;
