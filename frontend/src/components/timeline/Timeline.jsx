import React, { useContext, useEffect, useState } from "react";
import { Share } from "../share/Share";
import { Post } from "../post/Post";
import "./Timeline.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export const Timeline = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get(
                      `http://localhost:4000/api/posts/profile/${username}`,
                      {
                          headers: {
                              Authorization: `Bearer ${user.token}`,
                          },
                      }
                  )
                : await axios.get("http://localhost:4000/api/posts/", {
                      headers: {
                          Authorization: `Bearer ${user.token}`,
                      },
                  });
            // console.log(res);
            //les posts listés de façon antéchronologiaue(du plus récent au plus ancien)
            setPosts(
                res.data.sort((post1, post2) => {
                    return (
                        new Date(post2.createdAt) - new Date(post1.createdAt)
                    );
                })
            );
        };
        fetchPosts();
    }, [username, user]);

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
