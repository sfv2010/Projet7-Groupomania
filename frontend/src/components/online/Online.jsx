import React from "react";
import "./Online.css";

export const Online = ({ user }) => {
    //user = props

    return (
        <>
            <li className="rightbarFriend">
                <div className="rightbarProfileContainer">
                    <img
                        src={user.profilePicture}
                        alt="icon de user"
                        className="rightProfileImg"
                    />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">{user.username}</span>
            </li>
        </>
    );
};
