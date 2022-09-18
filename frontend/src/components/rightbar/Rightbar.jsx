import React from "react";
import "./Rightbar.css";
import { Users } from "../../dummydata";
import { Online } from "../online/Online";

export const Rightbar = ({ user }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightbar = () => {
        return (
            <>
                <div className="eventContainer">
                    <img
                        src={PUBLIC_FOLDER + "star.png"}
                        alt="etoile bleu"
                        className="starImg"
                    />
                    <h2 className="eventText">
                        <b>Nouvelles de Groupomania</b>
                    </h2>
                </div>
                <img
                    src={PUBLIC_FOLDER + "post/equipe.jpeg"}
                    alt="4 nouvelles recrues"
                    className="rightbarImg"
                />
                <h3 className="rightbarTitle">Amis en ligne</h3>
                <ul className="rightbarFriendList">
                    {Users.map((user) => (
                        <Online user={user} key={user.id} />
                    ))}
                </ul>
            </>
        );
    };
    const ProfileRightbar = () => {
        return (
            <>
                <div className="rightbarInfo">
                    <h3 className="rightbarTitle">
                        Informations de l'utilisateur
                    </h3>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfokey">
                            Lieu de naissance:
                        </span>
                        <span className="rightbarInfokey">{user.city}</span>
                    </div>
                    <hr className="hr" />
                    <h4 className="rightbarTitle">Amis</h4>
                    <div className="rightbarFollowings">
                        <div className="rightbarFollowing">
                            <img
                                src={PUBLIC_FOLDER + "person/Rena.jpg"}
                                alt="Icon de Rena"
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">Rena</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img
                                src={PUBLIC_FOLDER + "person/sena.jpg"}
                                alt="Icon de Sena"
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">Sena</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img
                                src={PUBLIC_FOLDER + "person/ken.jpg"}
                                alt="Icon de ken"
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">Ken</span>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    return (
        <section className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </section>
    );
};
