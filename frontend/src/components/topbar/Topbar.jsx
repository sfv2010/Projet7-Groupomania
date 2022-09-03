import {
    AccountCircle,
    Home,
    Notifications,
    Search,
} from "@mui/icons-material";
import React from "react";
import "./Topbar.css";

export const Topbar = () => {
    return (
        <header className="topbarContainer">
            <h1 className="topbarLeft">
                <img
                    src="/assets/Groupomania /icon-left-font-monochrome-white.svg"
                    alt="Logo de Groupomania"
                    className="topbarLogo"
                />
            </h1>
            <ul className="topbarCenter">
                <li>
                    <a aria-label="Accueil" href="index.html">
                        <Home className="topbarIcon" />
                    </a>
                </li>
                <li>
                    <a aria-label="Compte" href="index.html">
                        <AccountCircle className="topbarIcon" />
                    </a>
                </li>
                <li>
                    <a aria-label="Notification" href="index.html">
                        <Notifications className="topbarIcon" />
                        <span className="topbarIconBadge">1</span>
                    </a>
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
                <img
                    src="/assets/person/chevalicon.jpg"
                    alt="Icon de cheval"
                    className="topbarImg"
                />
            </div>
        </header>
    );
};
