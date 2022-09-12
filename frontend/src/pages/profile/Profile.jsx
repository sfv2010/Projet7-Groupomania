import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Topbar } from "../../components/topbar/Topbar";
import { Timeline } from "../../components/timeline/Timeline";
import { Rightbar } from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Profile = () => {
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            //Rechercher aprés ? sur url
            const res = await axios.get(`/users?username=${username}`);

            setUser(res.data);
            // console.log(res.data);
        };
        fetchUser();
    }, [username]); //普通は空箱！

    return (
        <>
            <Topbar />
            <div className="profileContainer">
                <div className="profile">
                    <div className="profileTop">
                        <div className="profileCover">
                            <img
                                src={
                                    user.coverPicture ||
                                    "/assets/post/paysage.jpg"
                                }
                                alt="paysage de campagne"
                                className="profileImg"
                            />
                            <img
                                src={
                                    user.profilePicture ||
                                    "/assets/person/Anonym.svg"
                                }
                                alt="L'utilisateur n' a pas ajouter d' icon"
                                className="profileUserImg"
                            />
                        </div>
                        <div className="profileInfo">
                            <h2 className="profileInfoName">{user.username}</h2>
                            <span className="profileInfoDesc">
                                {user.description}
                            </span>
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
