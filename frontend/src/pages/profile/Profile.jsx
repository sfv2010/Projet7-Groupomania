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
    //const [file, setFile] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    //const { email, userPseudo, city, desc } = useRef();
    const email = useRef();
    const userPseudo = useRef();
    const password = useRef();
    const city = useRef();
    const desc = useRef();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(city.current.value);
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
                                    <form
                                        className="profileEditBox"
                                        onSubmit={(e) => handleSubmit(e)}
                                    >
                                        <h1 className="profileEditH1">
                                            Profile
                                        </h1>
                                        <div className="profileEditWrapper">
                                            <p className="profileEditP">
                                                E-mail
                                            </p>
                                            <div className="profileEditIn">
                                                <input
                                                    type="email"
                                                    className="profileEditInput"
                                                    ref={email}
                                                />
                                            </div>
                                            <p className="profileEditP">
                                                Nom ou Pseudonyme
                                            </p>
                                            <div className="profileEditIn">
                                                <input
                                                    type="text"
                                                    className="profileEditInput"
                                                    ref={userPseudo}
                                                />
                                            </div>
                                            <p className="profileEditP">
                                                Password
                                            </p>
                                            <div className="profileEditIn">
                                                <input
                                                    type="text"
                                                    className="profileEditInput"
                                                    ref={password}
                                                    minLength="8"
                                                />
                                            </div>
                                            <p className="profileEditP">
                                                Description
                                            </p>
                                            <div className="profileEditIn">
                                                <input
                                                    type="text"
                                                    className="profileEditInput"
                                                    ref={desc}
                                                />
                                            </div>
                                            <p className="profileEditP">
                                                Lieu de naissance
                                            </p>
                                            <div className="profileEditIn">
                                                <input
                                                    type="text"
                                                    className="profileEditInput"
                                                    ref={city}
                                                />
                                            </div>
                                            <div className="profileEditPhoto">
                                                <p className="profileEditP">
                                                    Photo de profil
                                                </p>
                                                <img
                                                    src={
                                                        user.profilePicture
                                                            ? PUBLIC_FOLDER +
                                                              user.profilePicture
                                                            : PUBLIC_FOLDER +
                                                              "/person/Anonym.svg"
                                                    }
                                                    alt="L'utilisateur n'a pas ajouter d'icon"
                                                    className="topbaImg profileEditImg"
                                                />
                                                <label
                                                    htmlFor="file"
                                                    className="shareOption"
                                                >
                                                    <span className="shareEditSpan">
                                                        Changer votre photo de
                                                        profil
                                                    </span>
                                                    <input
                                                        className="shareInputImg"
                                                        type="file"
                                                        id="file"
                                                        accept=".png, .jpeg, .jpg"
                                                        // onChange={(e) =>
                                                        //     setFile(
                                                        //         e.target
                                                        //             .files[0]
                                                        //     )
                                                        // } //setFile=useState
                                                        // name="file"
                                                    />{" "}
                                                </label>
                                            </div>
                                            <button className="profileEditButton">
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
                        <Timeline
                            username={username}
                            currentUser={currentUser}
                        />
                        <Rightbar user={user} className="profileRightbar" />
                    </div>
                </div>
            </div>
        </>
    );
};
