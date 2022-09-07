import React from "react";
import "./Rightbar.css";
import { Users } from "../../dummydata";
import { Online } from "../online/Online";

export const Rightbar = ({ profile }) => {
    const HomeRightbar = () => {
        return (
            <>
                <div className="eventContainer">
                    <img
                        src="/assets/star.png"
                        alt="etoile bleu"
                        className="starImg"
                    />
                    <h2 className="eventText">
                        <b>Nouvelles de Groupomania</b>
                    </h2>
                </div>
                <img
                    src="/assets/post/equipe.jpg"
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
                <h3 className="rightbarTitle">Informations de l'utilisateur</h3>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfokey">
                            Lieu de naissance:
                        </span>
                        <span className="rightbarInfokey">fukuoka</span>
                    </div>
                    <hr className="hr" />
                    <h4 className="rightbarTitle">Amis</h4>
                    <div className="rightbarFollowings">
                        <div className="rightbarFollowing">
                            <img
                                src="/assets/person/Rena.jpg"
                                alt="Icon de Rena"
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">Rena</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img
                                src="/assets/person/sena.jpg"
                                alt="Icon de Sena"
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">Sena</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img
                                src="/assets/person/sena.jpg"
                                alt="Icon de Sena"
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">Sena</span>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    return (
        <section className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </section>
    );
};
