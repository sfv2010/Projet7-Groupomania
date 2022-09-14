import { FavoriteBorder, MoreHoriz } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
//import { format } from "timeago.js";

export const Post = ({ post }) => {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    //const SRC_FOLDER = process.env.REACT_APP_SRC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                `http://localhost:4000/api/users?userId=${post.userId}`
            );
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const handleLike = async () => {
        try {
            //いいねのAPIを叩く
            await axios.put(
                `http://localhost:4000/api/posts/${post._id}/like`,
                {
                    userId: currentUser._id,
                }
            );
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };
    return (
        <section className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {/* <Link to = {`/profile/${user.username}`}> */}
                        <img
                            src={
                                user.profilePicture
                                    ? PUBLIC_FOLDER + user.profilePicture
                                    : PUBLIC_FOLDER + "person/icon.png"
                            }
                            alt="icon de l'utilisateur"
                            className="postProfileimg"
                        />
                        {/* </Link> */}
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">
                            {/* {format(post.createdAt)} */}
                            {post.createdAt}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <MoreHoriz />
                    </div>
                </div>

                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img
                        src={PUBLIC_FOLDER + post.img}
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
                                    src={PUBLIC_FOLDER + "/heart.png"}
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
