import React from "react";
import { Share } from "../share/Share";
import { Post } from "../post/Post";
import "./Timeline.css";
import { Posts } from "../../dummydata";

export const Timeline = () => {
    return (
        <div className="timeline">
            <div className="timelineWrapper"></div>
            <Share />

            {Posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
};
