import { Home } from "./pages/home/Home";
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./state/AuthContext";

export const App = () => {
    const { user } = useContext(AuthContext);
    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Register />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
                <Route path="/profile/:username" element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default App;
