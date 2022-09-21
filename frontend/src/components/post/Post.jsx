import {
    AddAPhoto,
    DeleteForever,
    FavoriteBorder,
    GifBox,
    ModeEdit,
    MoreHoriz,
} from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
import { format } from "timeago.js";
import { Comment } from "../comment/Comment";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
    //recevoir props de timeline
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({}); //user = pour obetenir les infos de proprietaire de post.
    const { user: currentUser } = useContext(AuthContext); //on change le nom "user=>currentUser" pour distinguer entre user de useState.
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(
        !!post.likes.find((like) => like === currentUser.userId)
    );

    //const [deleteP, setDeleteP] = useState("");

    const [editPost, setEditPost] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [file, setFile] = useState(null);

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
                currentUser._id, //id de utilisateur
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            console.log(currentUser);
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    const handleComment = () => {
        setShowComment(!showComment);
    };

    const handlePost = () => {
        setEditPost(!editPost);
    };
    const updatePost = async (e) => {
        e.preventDefault();
        const editPost = {
            userId: user._id,
            desc: post.desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName); //key + value
            data.append("file", file);
            editPost.img = fileName;
            try {
                await axios.put(
                    `http://localhost:4000/api/posts/${post.userId}`,
                    data,
                    {
                        headers: {
                            //"Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${currentUser.token}`,
                        },
                    }
                );
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.put(`http://localhost:4000/api/posts/${post.userId}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });
        } catch (err) {
            document.location.reload(true);
        }
    };

    const deletePost = async () => {
        window.confirm("Êtes-vous sûr de vouloir supprimer?");
        try {
            await axios.delete(
                `http://localhost:4000/api/posts/${post.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            Window.location.reload(true);

            // setDeleteP("");
        } catch (err) {
            console.log(err);

            // setDeleteP(
            //     "Vous n'êtes pas autorisé à supprimé le post de quelqu'un d'autre"
            // );
        }
    };

    return (
        <section className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={
                                    user.profilePicture
                                        ? PUBLIC_FOLDER + user.profilePicture
                                        : PUBLIC_FOLDER + "person/Anonym.svg"
                                }
                                alt="icon de l'utilisateur"
                                className="postProfileimg"
                            />
                        </Link>
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">
                            {format(post.createdAt)}
                            {/* {post.createdAt} */}
                        </span>
                    </div>
                    {post.userId === currentUser.userId && (
                        <nav className="postTopRight">
                            <div className="postNav">
                                <MoreHoriz />
                            </div>
                            <ul className="postNavList">
                                <li
                                    onClick={() => handlePost()}
                                    className="postNavEdit"
                                >
                                    <ModeEdit htmlColor="blue" />
                                    <span className="postNavSpan">
                                        Modifier
                                    </span>
                                </li>
                                <li
                                    onClick={() => deletePost(post.userId)}
                                    className="postNavDelete"
                                >
                                    <DeleteForever htmlColor="red" />
                                    <span className="postNavSpan">
                                        Supprimer
                                    </span>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>

                <div className="postCenter">
                    {editPost ? (
                        <>
                            <div className="sharePost">
                                <textarea
                                    type="text"
                                    className="shareInput"
                                    defaultValue={post.desc}
                                ></textarea>
                            </div>
                            <hr className="shareHr" />
                            <form
                                className="shareButtons"
                                onSubmit={(e) => updatePost(e)}
                                encType="multipart/form-data"
                            >
                                <div className="shareOptions">
                                    <label
                                        htmlFor="file"
                                        className="shareOption"
                                    >
                                        <AddAPhoto
                                            className="shareIcon"
                                            htmlColor="blue"
                                        />
                                        <span className="shareOptionText">
                                            Photo
                                        </span>
                                        <input
                                            className="shareInputImg"
                                            type="file"
                                            id="file"
                                            accept=".png, .jpeg, .jpg"
                                            onChange={(e) =>
                                                setFile(e.target.files[0])
                                            } //setFile=useState
                                            name="file"
                                        />
                                    </label>
                                    <div className="shareOption">
                                        <GifBox
                                            className="shareIcon"
                                            htmlColor="red"
                                        />
                                        <span className="shareOptionText">
                                            GIF
                                        </span>
                                    </div>
                                </div>
                                <button className="shareButton" type="submit">
                                    Publier
                                </button>
                            </form>
                        </>
                    ) : (
                        <span className="postText">{post.desc}</span>
                    )}
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
                            onClick={() => handleComment()}
                        >
                            <p className="postComentText">
                                {post.comment} commentaires
                            </p>
                        </div>
                    </div>
                    {showComment && (
                        <Comment
                            user={user}
                            setUser={setUser}
                            currentUser={currentUser}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
