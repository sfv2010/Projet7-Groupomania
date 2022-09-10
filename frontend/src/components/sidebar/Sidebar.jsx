import { Home, MessageRounded, Person, Search } from "@mui/icons-material";
import React from "react";
import { ListFriend } from "../listFriend/ListFriend";
import "./Sidebar.css";
import { Users } from "../../dummydata";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Home className="sidebarIcon" />
                        <Link to="/">
                            <span className="sidebarText">Accueil</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <MessageRounded className="sidebarIcon" />
                        <Link to="/">
                            <span className="sidebarText">Message</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Person className="sidebarIcon" />
                        <Link to="/profile/:username">
                            <span className="sidebarText">Mon Compte</span>
                        </Link>
                    </li>
                    {/* <li className="sidebarListItem">
                        <Groups className="sidebarIcon" />
                        <Link to="/"></Link>
                        <span className="sidebarText">Groupes</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <Link to="/"></Link>
                        <span className="sidebarText">Enregistrement</span>
                    </li> */}
                    <li className="sidebarListItem">
                        <Search className="sidebarIcon" />
                        <Link to="/"></Link>
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
