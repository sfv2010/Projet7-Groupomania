import React from "react";
import { Share } from "../share/Share";
import { Post } from "../post/Post";
import "./Timeline.css";

export const Timeline = () => {
    return (
        <div className="timeline">
            <div className="timelineWrapper"></div>
            <Share />
            <Post />
        </div>
    );
};
