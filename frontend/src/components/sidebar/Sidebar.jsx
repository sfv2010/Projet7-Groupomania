import { Home, MessageRounded, Person, Search } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { ListFriend } from "../listFriend/ListFriend";
import "./Sidebar.css";
import { Users } from "../../dummydata";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export const Sidebar = () => {
    const { user: currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});

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
    }, [currentUser]); //普通は空箱！
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
                        <Link to={`/profile/${user.username}`}>
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
                <ul className="sidebarFriendList">
                    {Users.map((user) => (
                        <ListFriend user={user} key={user.id} />
                    ))}
                </ul>
            </div>
        </nav>
    );
};
