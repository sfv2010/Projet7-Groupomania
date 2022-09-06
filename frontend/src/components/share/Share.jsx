import React from "react";
import "./Share.css";
import { AddAPhoto, GifBox } from "@mui/icons-material";

export const Share = () => {
    return (
        <main className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src="/assets/person/cheval.jpg"
                        alt="icon de User"
                        className="shareProfileImg"
                    />
                    <div className="sharePost">
                        <input
                            type="text"
                            className="shareInput"
                            placeholder="Quoi de neuf?"
                        />
                    </div>
                </div>
                <hr className="shareHr" />
                <div className="shareButtons">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <AddAPhoto className="shareIcon" htmlColor="blue" />
                            <span className="shareOptionText">Photo</span>
                        </div>
                        <div className="shareOption">
                            <GifBox className="shareIcon" htmlColor="red" />
                            <span className="shareOptionText">GIF</span>
                        </div>
                    </div>
                    <button className="shareButton">Publier</button>
                </div>
            </div>
        </main>
    );
};
