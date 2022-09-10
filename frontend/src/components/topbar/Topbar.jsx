import {
    AccountCircle,
    Home,
    Notifications,
    PowerSettingsNew,
    Search,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

export const Topbar = () => {
    // const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <header className="topbarContainer">
            <h1 className="topbarLeft">
                <img
                    src="/assets/groupomania /icon-left-font-monochrome-white.svg"
                    alt="Logo de Groupomania"
                    className="topbarLogo"
                />
            </h1>
            <ul className="topbarCenter">
                <Link to="/">
                    <li className="topbarList" aria-label="Accueil">
                        <Home className="topbarIcon" />
                        <span className="topbarNotice">Accueil</span>
                    </li>
                </Link>
                <Link to="/profile/:username">
                    <li className="topbarList" aria-label="Profil">
                        <AccountCircle className="topbarIcon" />
                        <span className="topbarNotice">Profil</span>
                    </li>
                </Link>
                <li className="topbarList" ria-label="Notification">
                    <Notifications className="topbarIcon" />
                    <span className="topbarNotice">Notification</span>
                </li>
            </ul>
            <div className="topbarRight">
                <div className="serchbar">
                    <Search className="searchIcon" />
                    <input
                        type="text"
                        className="serchInput"
                        placeholder="Rechercher sur Groupomania"
                    />
                </div>
                <div className="topbarLogout">
                    <PowerSettingsNew className="topbarIcon logout" />
                    <span className="topbarNotice">Quitter</span>
                </div>
            </div>
        </header>
    );
};
