import { FavoriteBorder, MoreHoriz } from "@mui/icons-material";
import React, { useState } from "react";
import "./Post.css";
import { Users } from "../../dummydata";

export const Post = ({ post }) => {
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    const handleLike = () => {
        setLike(isLiked ? like - 1 : like + 1); //si déja liké = -1
        setIsLiked(!isLiked); //!isLiked= true
    };
    return (
        <section className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            src={
                                Users.filter((user) => user.id === post.id)[0]
                                    .profilePicture
                            }
                            alt="icon de licorne"
                            className="postProfileimg"
                        />
                        <span className="postUserName">
                            {
                                Users.filter((user) => user.id === post.id)[0]
                                    .username
                            }
                        </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreHoriz />
                    </div>
                </div>

                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img
                        src={post.photo}
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
