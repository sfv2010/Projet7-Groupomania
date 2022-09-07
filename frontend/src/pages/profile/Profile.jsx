import React from "react";
import "./Profile.css";
import { Topbar } from "../../components/topbar/Topbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Timeline } from "../../components/timeline/Timeline";
import { Rightbar } from "../../components/rightbar/Rightbar";

export const Profile = () => {
    return (
        <>
            <Topbar />
            <div className="profileContainer">
                <Sidebar />
                <div className="profile">
                    <div className="profileTop">
                        <div className="profileCover">
                            <img
                                src="/assets/post/paysage.jpg"
                                alt="paysage de campagne"
                                className="profileImg"
                            />
                            <img
                                src="/assets/person/cheval.jpg"
                                alt="icon de cheval"
                                className="profileUserImg"
                            />
                        </div>
                        <div className="profileInfo">
                            <h2 className="profileInfoName">Savin</h2>
                            <span className="profileInfoDesc">
                                J'apprends React tous les jours!{" "}
                            </span>
                        </div>
                    </div>
                    <div className="profileBottom">
                        <Timeline />
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    );
};
