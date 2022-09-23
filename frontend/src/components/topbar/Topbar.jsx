import {
    AccountCircle,
    Home,
    PowerSettingsNew,
    Search,
} from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";
import "./Topbar.css";
import { dispatchLogout } from "../../state/dispatch";
import axios from "axios";

export const Topbar = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { dispatch, user: currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});

    const handleLogout = (e) => {
        e.preventDefault();
        dispatchLogout(dispatch);
    };
    useEffect(() => {
        const fetchUser = async () => {
            //Rechercher aprés ? sur url
            const res = await axios.get(
                `http://localhost:4000/api/users?userId=${currentUser.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );

            setUser(res.data);
            // console.log(res.data);
        };
        fetchUser();
    }, [currentUser]);
    return (
        <header className="topbarContainer">
            <h1 className="topbarLeft">
                <img
                    src={
                        PUBLIC_FOLDER +
                        "groupomania /icon-left-font-monochrome-white.svg"
                    }
                    alt="Logo de Groupomania"
                    className="topbarLogo"
                />
                <img
                    src={PUBLIC_FOLDER + "groupomania /iconLogo.png"}
                    alt="Logo de Groupomania"
                    className="topbarLogo2"
                />
            </h1>
            <ul className="topbarCenter">
                <Link to="/">
                    <li className="topbarList" aria-label="Accueil">
                        <Home className="topbarIcon" />
                        <span className="topbarNotice">Accueil</span>
                    </li>
                </Link>
                <Link to={`/profile/${user.username}`}>
                    <li className="topbarList" aria-label="Profil">
                        <AccountCircle className="topbarIcon" />
                        <span className="topbarNotice">Profil</span>
                    </li>
                </Link>
                <li
                    className="topbarList logout"
                    aria-label="Logout"
                    onClick={handleLogout}
                >
                    <PowerSettingsNew className="topbarIcon" />
                    <span className="topbarNotice">Quitter</span>
                </li>
            </ul>
            <div className="topbarRight">
                <div className="serchbar">
                    <Search className="searchIcon" />
                    <input
                        type="text"
                        className="serchInput"
                        placeholder="Rechercher"
                    />
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={
                            user.profilePicture
                                ? PUBLIC_FOLDER + user.profilePicture
                                : PUBLIC_FOLDER + "person/icon.png"
                        }
                        alt="Avateur"
                        className="topbarImg"
                    />
                </Link>
            </div>
        </header>
    );
};
