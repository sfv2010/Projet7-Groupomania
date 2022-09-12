import React, { useContext, useEffect, useState } from "react";
import { Share } from "../share/Share";
import { Post } from "../post/Post";
import "./Timeline.css";
import axios from "axios";

import { AuthContext } from "../../state/AuthContext";

export const Timeline = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         const response = await axios.get(
    //             `http://localhost:4000/api/posts/timeline/${user._id}`
    //         );
    //         console.log(response);
    //         setPosts(response.data);
    //     };
    //     fetchPosts();
    // }, [user]); //,[]=juste premier fois

    useEffect(() => {
        const fetchPosts = async () => {
            const response = username
                ? await axios.get(
                      `http://localhost:4000/api/posts/profile/${username}`
                  )
                : await axios.get(
                      `http://localhost:4000/api/posts/timeline/${user._id}`
                  );
            console.log(response);
            setPosts(response.data);
        };
        fetchPosts();
    }, [username, user._id]); //,[]=juste premier fois

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
