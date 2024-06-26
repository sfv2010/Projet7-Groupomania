import React, { useEffect, useState, useContext, useRef } from "react";
import "./Profile.css";
import { Topbar } from "../../components/topbar/Topbar";
import { Timeline } from "../../components/timeline/Timeline";
import { Rightbar } from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export const Profile = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const username = useParams().username;
    const [user, setUser] = useState({});
    const [file, setFile] = useState(null);
    const [imgPost, setImgPost] = useState("");
    const [editProfile, setEditProfile] = useState(false);
    const [descProfile, setDescProfile] = useState(user.desc);
    const [cityProfile, setCityProfile] = useState(user.city);
    const profilePicture = useRef(user.profilePicture);

    useEffect(() => {
        const fetchUser = async () => {
            //Rechercher aprés ? sur url
            const res = await axios.get(`http://localhost:4000/api/users?username=${username}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });

            setUser(res.data);
            // console.log(res.data);
        };
        fetchUser();
    }, [username, currentUser.token]);

    const handleProfile = () => {
        setEditProfile(!editProfile);
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        const editProfile = {
            profilePicture: profilePicture.current.value,
            desc: descProfile,
            city: cityProfile,
        };
        console.log(user.city);

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName); //key + value
            data.append("file", file);
            editProfile.profilePicture = fileName;

            try {
                await axios.put(`http://localhost:4000/api/users/${user._id}`, data, {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.put(`http://localhost:4000/api/users/${user._id}`, editProfile, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const showSelectedPhoto = (e) => {
        setImgPost(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        e.target.value = "";
    };
    const onClickSwitchShowImg = () => {
        setImgPost("");
        setFile(null);
    };

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
                            {user._id === currentUser.userId && (
                                <button className="profileEditButton" onClick={handleProfile}>
                                    Modifier
                                </button>
                            )}
                        </div>
                        {editProfile ? (
                            <>
                                <div className="profileEdit">
                                    <form
                                        className="profileEditBox"
                                        onSubmit={(e) => updateProfile(e)}
                                        encType="multipart/form-data"
                                    >
                                        <h1 className="profileEditH1">Profil</h1>
                                        <div className="profileEditWrapper">
                                            <p className="profileEditP">Description</p>
                                            <div className="profileEditIn">
                                                <input
                                                    type="text"
                                                    className="profileEditInput"
                                                    onChange={(e) => setDescProfile(e.target.value)}
                                                />
                                            </div>
                                            <p className="profileEditP">Lieu de naissance</p>
                                            <div className="profileEditIn">
                                                <input
                                                    type="text"
                                                    className="profileEditInput"
                                                    onChange={(e) => setCityProfile(e.target.value)}
                                                />
                                            </div>
                                            <div className="profileEditPhoto">
                                                <p className="profileEditP">Photo de profil</p>
                                                <img
                                                    src={
                                                        user.profilePicture
                                                            ? PUBLIC_FOLDER + user.profilePicture
                                                            : PUBLIC_FOLDER + "/person/Anonym.svg"
                                                    }
                                                    alt="L'utilisateur n'a pas ajouter d'icon"
                                                    className="profileEditImg"
                                                    ref={profilePicture}
                                                />
                                                <label className="shareOption">
                                                    <span className=" profileEditSpan">
                                                        Changer votre photo de profil
                                                    </span>
                                                    <input
                                                        className="shareInputImg"
                                                        type="file"
                                                        accept=".png, .jpeg, .jpg"
                                                        onChange={(e) => showSelectedPhoto(e)}
                                                        name="file"
                                                    />
                                                </label>
                                            </div>

                                            {file && (
                                                <div className="showImg">
                                                    <img
                                                        src={imgPost}
                                                        className="profileImgSelected"
                                                        alt="Afficher la sélection"
                                                    />
                                                    <button
                                                        onClick={onClickSwitchShowImg}
                                                        className="profileShowButton"
                                                    >
                                                        Annuler
                                                    </button>
                                                </div>
                                            )}

                                            <button className="profileEditButton" type="submit">
                                                Modifier
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <div className="profileBottom">
                        <Timeline username={username} currentUser={currentUser} />
                        <Rightbar user={user} className="profileRightbar" />
                    </div>
                </div>
            </div>
        </>
    );
};
