import { FavoriteBorder, MoreHoriz } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
import { format } from "timeago.js";

export const Post = ({ post }) => {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({}); //user = proprietaire de post
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext); //on change le nom "user=>currentUser" pour distinguer entre user de ligne11

    const [showComment, setShowComment] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                `http://localhost:4000/api/users?userId=${post.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId, currentUser]);

    const handleLike = async () => {
        try {
            //appeler API Liker
            await axios.put(
                `http://localhost:4000/api/posts/${post._id}/like`,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                    userId: currentUser._id, //id de utilisateur
                }
            );
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    //     const handleComent = async() => {
    //         try {}
    //    catch (err) { }

    // const handleLike = async () => {
    //     try {
    //         //appeler API Liker
    //         await axios.put(
    //             `http://localhost:4000/api/posts/${post._id}/like`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${currentUser.token}`,
    //                 },
    //                 userId: currentUser._id, //id de utilisateur
    //             }
    //         );
    //     } catch (err) {
    //         console.log(err);
    //     }
    //     setLike(isLiked ? like - 1 : like + 1);
    //     setIsLiked(!isLiked);
    // };

    const handlecomment = () => {
        setShowComment(!showComment);
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
                            {format(post.createdAt)}
                            {/* {post.createdAt} */}
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
                        {/* <div className="postBottomRight">
                            <span className="postComentText">
                                {post.coment} commentaires
                            </span>
                        </div> */}
                        <div
                            className="postBottomRight"
                            onClick={() => handlecomment()}
                        >
                            <p className="postComentText">
                                {post.comment} commentaires
                            </p>
                        </div>
                    </div>
                    {showComment && (
                        <div className="shareWrapper">
                            <hr className="shareHr" />
                            <div className="shareTop">
                                <img
                                    src={
                                        user.profilePicture
                                            ? PUBLIC_FOLDER +
                                              user.profilePicture
                                            : PUBLIC_FOLDER +
                                              "/person/Anonym.svg"
                                    }
                                    alt="icon de User"
                                    className="shareProfileImg"
                                />
                                <div className="sharePost">
                                    <input
                                        type="text"
                                        className="shareInput"
                                        placeholder=" Écrivez un commentaire"
                                        //ref={desc}
                                    />
                                </div>
                                <button className="shareButton" type="submit">
                                    Publier
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
