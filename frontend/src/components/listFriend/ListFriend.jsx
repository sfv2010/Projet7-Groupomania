import React from "react";
import "./ListFriend.css";

export const ListFriend = ({ user }) => {
    //const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <li className="sidebarFriend">
                <img
                    // src={PUBLIC_FOLDER + user.profilePicture}
                    src={user.profilePicture}
                    alt="icon d'ami"
                    className="sidebarFriendImg"
                />
                <span className="sidebarFriendName">{user.username}</span>
            </li>
        </>
    );
};
