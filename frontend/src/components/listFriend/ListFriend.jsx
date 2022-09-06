import React from "react";

export const ListFriend = ({ user }) => {
    return (
        <>
            <li className="sidebarFriend">
                <img
                    src={user.profilePicture}
                    alt="icon d'ami"
                    className="sidebarFriendImg"
                />
                <span className="sidebarFriendName">{user.username}</span>
            </li>
        </>
    );
};
