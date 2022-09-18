import {
    DeleteForever,
    FavoriteBorder,
    ModeEdit,
    MoreHoriz,
} from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
import { format } from "timeago.js";
import { Comment } from "../comment/Comment";

export const Post = ({ post }) => {
    //recevoir props de timeline
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({}); //user = pour obetenir les infos de proprietaire de post.
    //const [deleteP, setDeleteP] = useState("");
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext); //on change le nom "user=>currentUser" pour distinguer entre user de ligne11
    const [showComment, setShowComment] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                `http://localhost:4000/api/users?userId=${post.userId}`, //userId=proprietaire de post.
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
                `http://localhost:4000/api/posts/${post._id}/like`, //Identifiant de l'article
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

    const handlecomment = () => {
        setShowComment(!showComment);
    };

    // const deletePost = async () => {
    //     try {
    //         await axios.delete(
    //             `http://localhost:4000/api/posts/${post.userId}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${currentUser.token}`,
    //                 },
    //             }
    //         );
    //         setDeleteP("");
    //     } catch (error) {
    //         setDeleteP(
    //             "Vous n'êtes pas autorisé à supprimé le post de quelqu'un d'autre"
    //         );
    //     }
    // };

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
                                    : PUBLIC_FOLDER + "person/Anonym.svg"
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
                    <nav className="postTopRight">
                        <div className="postNav">
                            <MoreHoriz />
                        </div>
                        <ul className="postNavList">
                            <li className="postNavEdit">
                                <ModeEdit htmlColor="blue" />
                                <span className="postNavSpan">Modifier</span>
                            </li>
                            {/* <li onClick={()=>deletePost(post.userId)} className="postNavDelete"> */}
                            <li className="postNavDelete">
                                <DeleteForever htmlColor="red" />
                                <span className="postNavSpan">Supprimer</span>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    {post.img && (
                        <img
                            src={PUBLIC_FOLDER + post.img}
                            alt="Liée au poste"
                            className="postImg"
                        />
                    )}
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
                        <div
                            className="postBottomRight"
                            onClick={() => handlecomment()}
                        >
                            <p className="postComentText">
                                {post.comment} commentaires
                            </p>
                        </div>
                    </div>
                    {showComment && <Comment />}
                </div>
            </div>
        </section>
    );
};
