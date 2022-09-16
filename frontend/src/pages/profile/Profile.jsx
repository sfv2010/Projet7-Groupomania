import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import { Topbar } from "../../components/topbar/Topbar";
import { Timeline } from "../../components/timeline/Timeline";
import { Rightbar } from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export const Profile = () => {
    const [user, setUser] = useState({});
    const username = useParams().username;
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            //Rechercher aprés ? sur url
            const res = await axios.get(
                `http://localhost:4000/api/users?username=${username}`,
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
    }, [username, currentUser.token]); //普通は空箱！

    return (
        <>
            <Topbar />
            <div className="profileContainer">
                <div className="profile">
                    <div className="profileTop">
                        <div className="profileCover">
                            <img
                                src={
                                    user.coverPicture
                                        ? PUBLIC_FOLDER + user.coverPicture
                                        : PUBLIC_FOLDER + "/post/paysage.jpg"
                                }
                                alt="arrière-plan de l'utilisateur"
                                className="profileImg"
                            />
                            <img
                                src={
                                    user.profilePicture
                                        ? PUBLIC_FOLDER + user.profilePicture
                                        : PUBLIC_FOLDER + "/person/Anonym.svg"
                                }
                                alt="L'utilisateur n'a pas ajouter d'icon"
                                className="profileUserImg"
                            />
                        </div>
                        <div className="profileInfo">
                            <h2 className="profileInfoName">{user.username}</h2>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileBottom">
                        <Timeline username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
};

// export default Profile;
