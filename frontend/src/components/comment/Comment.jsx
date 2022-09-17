import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import "./Comment.css";

export const Comment = () => {
    const [user, setUser] = useState({}); //user = proprietaire de post
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                `http://localhost:4000/api/users?userId=${currentUser.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            setUser(res.data);
        };
        fetchUser();
    }, [currentUser]);

    return (
        <div className="shareWrapper">
            <hr className="shareHr" />
            <div className="shareTop">
                <img
                    src={
                        user.profilePicture
                            ? PUBLIC_FOLDER + user.profilePicture
                            : PUBLIC_FOLDER + "/person/Anonym.svg"
                    }
                    alt="icon de User"
                    className="shareProfileImg"
                />
                <div className="sharePost">
                    <input
                        type="text"
                        className="shareInput"
                        placeholder=" Écrivez un commentaire"
                        //ref={desc}
                    />
                </div>
                <button className="shareButton" type="submit">
                    Publier
                </button>
            </div>
        </div>
    );
};
