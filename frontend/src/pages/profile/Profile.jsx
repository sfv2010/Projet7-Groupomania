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
    const [editProfile, setEditProfile] = useState(false);
    //console.log(user);

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
    }, [username, currentUser.token]);

    const handleProfile = () => {
        setEditProfile(!editProfile);
    };
    // const updateProfile = async () => {

    //         const editProfile = {
    //             userId: userP._id,
    //             desc: description,
    //             img: post.img,
    //             isAdmin: user.isAdmin,
    //         };

    //         if (file) {
    //             const data = new FormData();
    //             const fileName = Date.now() + file.name;
    //             data.append("name", fileName); //key + value
    //             data.append("file", file);
    //             editPost.img = fileName;
    //             try {
    //                 await axios.put(
    //                     `http://localhost:4000/api/posts/${post._id}`,
    //                     data,
    //                     {
    //                         headers: {
    //                             Authorization: `Bearer ${currentUser.token}`,
    //                         },
    //                     }
    //                 );
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         }

    //         try {
    //             await axios.put(
    //                 `http://localhost:4000/api/posts/${post._id}`,
    //                 editPost,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${currentUser.token}`,
    //                     },
    //                 }
    //             );
    //             window.location.reload();
    //         } catch (err) {
    //             console.log(err);
    //         }

    //}

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
                            {(user._Id === currentUser.userId ||
                                user.isAdmin) && (
                                // <button className="profileEditButton" onClick={updateProfile}>
                                <button
                                    className="profileEditButton"
                                    onClick={handleProfile}
                                >
                                    Modifier
                                </button>
                            )}
                        </div>
                        {editProfile ? (
                            <>
                                <div className="profileEdit">
                                    <h1 className="profileEditH1">Profile</h1>
                                    <div className="profileEditWrapper">
                                        <p className="profileEditH2">
                                            Pseudonyme
                                        </p>
                                        <input type="text" />
                                        <p>Description</p>
                                        <input type="text" />
                                        <p>Lieu de naissance:</p>
                                        <input type="text" />
                                        <div className="profileEditPhoto">
                                            <p>Photo de profil</p>
                                            <label
                                                htmlFor="file"
                                                className="shareOption"
                                            >
                                                {" "}
                                            </label>
                                            <span>Sélectionner une image</span>
                                            <input
                                                className="shareInputImg"
                                                type="file"
                                                id="file"
                                                accept=".png, .jpeg, .jpg"
                                                //onChange={(e) => setFile(e.target.files[0])} //setFile=useState
                                                name="file"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <div className="profileBottom">
                        <Timeline username={username} />
                        <Rightbar user={user} className="profileRightbar" />
                    </div>
                </div>
            </div>
        </>
    );
};
