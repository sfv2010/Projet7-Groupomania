import React from "react";
import "./Rightbar.css";
import { Users } from "../../dummydata";
import { Online } from "../online/Online";

export const Rightbar = () => {
    return (
        <section className="rightbar">
            <div className="rightbarWrapper">
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
            </div>
        </section>
    );
};
