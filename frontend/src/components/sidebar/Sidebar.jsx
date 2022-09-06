import {
    Bookmark,
    Groups,
    Home,
    MessageRounded,
    Person,
    Search,
} from "@mui/icons-material";
import React from "react";
import { ListFriend } from "../listFriend/ListFriend";
import "./Sidebar.css";
import { Users } from "../../dummydata";

export const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Home className="sidebarIcon" />
                        <span className="sidebarText">Accueil</span>
                    </li>
                    <li className="sidebarListItem">
                        <MessageRounded className="sidebarIcon" />
                        <span className="sidebarText">Message</span>
                    </li>
                    <li className="sidebarListItem">
                        <Person className="sidebarIcon" />
                        <span className="sidebarText">Mon Compte</span>
                    </li>
                    <li className="sidebarListItem">
                        <Groups className="sidebarIcon" />
                        <span className="sidebarText">Groupes</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarText">Enregistrement</span>
                    </li>
                    <li className="sidebarListItem">
                        <Search className="sidebarIcon" />
                        <span className="sidebarText">Rechercher</span>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                <ur className="sidebarFriendList">
                    {Users.map((user) => (
                        <ListFriend user={user} key={user.id} />
                    ))}
                </ur>
            </div>
        </nav>
    );
};
