import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import "./Comment.css";

export const Comment = (props) => {
    //const {user,setUser,currentUser} = props
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({}); //user = proprietaire de post
    const desc = useRef();
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            userId: user._id,
            desc: desc.current.value,
        };
        try {
            await axios.post("http://localhost:4000/api/comment", newComment, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="shareWrapper">
            <hr className="shareHr" />
            <form
                className="shareButtons"
                onSubmit={(e) => handleSubmit(e)}
                encType="multipart/form-data"
            >
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
                        <textarea
                            type="text"
                            className="shareInput"
                            placeholder=" Écrivez un commentaire"
                            ref={desc}
                        />
                    </div>
                    <button className="shareButton" type="submit">
                        Publier
                    </button>
                </div>
            </form>
        </div>
    );
};
