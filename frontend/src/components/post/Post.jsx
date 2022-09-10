import { FavoriteBorder, MoreHoriz } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
// import { format } from "timeago.js";

export const Post = ({ post }) => {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const handleLike = () => {
        setLike(isLiked ? like - 1 : like + 1); //si déja liké = -1
        setIsLiked(!isLiked); //!isLiked= true
    };
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);

            setUser(res.data);
            // console.log(res.data);
        };
        fetchUser();
    }, [post.userId]);
    return (
        <section className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {/* <Link to = {`/profile/${user.username}`}> */}
                        <img
                            src={
                                user.profilePicture || "/assets/person/icon.png"
                            }
                            alt="icon de licorne"
                            className="postProfileimg"
                        />
                        {/* </Link> */}
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">{post.createdAt}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreHoriz />
                    </div>
                </div>

                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img
                        src={post.img}
                        alt="un enfant qui touche un ordinateur"
                        className="postImg"
                    />
                    <div className="postBottom">
                        <div
                            className="postBottomLeft"
                            onClick={() => handleLike()}
                        >
                            <FavoriteBorder className="heart1" />
                            {isLiked && (
                                <img
                                    src="/assets/heart.png"
                                    alt="petit coeur rouge"
                                    className="heart2"
                                />
                            )}
                            <span className="postLikeCounter">
                                {like} J'aime
                            </span>
                        </div>
                        <div className="postBottomRight">
                            <span className="postComentText">
                                {post.coment} commentaires
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
