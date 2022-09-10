import React, { useEffect, useState } from "react";
import { Share } from "../share/Share";
import { Post } from "../post/Post";
import "./Timeline.css";
import axios from "axios";

export const Timeline = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(
                "http://localhost:4000/posts/timeline/6304b68d74186c2a1d4ca9ae"
            );
            console.log(response);
            setPosts(response.data);
        };
        fetchPosts();
    }, []); //,[]=juste premier fois

    return (
        <div className="timeline">
            <div className="timelineWrapper"></div>
            <Share />

            {posts.map((post) => (
                <Post post={post} key={post._id} />
            ))}
        </div>
    );
};
