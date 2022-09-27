import {
    AddAPhoto,
    DeleteForever,
    GifBox,
    ModeEdit,
    MoreHoriz,
} from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import "./Comment.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export const Comment = ({ post }) => {
    //recevoir props de timeline
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [userP, setUserP] = useState({}); //user = pour obetenir les infos de proprietaire de comment.
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext); //on change le nom "user=>currentUser" pour distinguer entre user de useState.
    // const [like, setLike] = useState(comment.likes.length);
    // const [isLiked, setIsLiked] = useState(
    //     !!comment.likes.find((like) => like === currentUser.userId)
    // ); //!!boolean
    const [editComment, setEditComment] = useState(false);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState(post.comments.commentDesc);
    //const descComment = useRef();
    console.log(post.comments);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                `http://localhost:4000/api/users?userId=${post.userId}`, //userId=proprietaire de comment.
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            setUserP(res.data);
        };
        fetchUser();
    }, [post.userId, currentUser]);

    useEffect(() => {
        const fetchUser = async () => {
            //Rechercher aprés ? sur url
            const res = await axios.get(
                `http://localhost:4000/api/users?userId=${currentUser.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );

            setUser(res.data);
            // console.log(res.data);
        };
        fetchUser();
    }, [currentUser]);

    // const handleLike = async () => {
    //     try {
    //         //appeler API Liker
    //         await axios.put(
    //             `http://localhost:4000/api/comments/${comment._id}/like`, //Identifiant de l'article
    //             currentUser.userId, //id de utilisateur
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${currentUser.token}`,
    //                 },
    //             }
    //         );
    //         console.log(currentUser.userId);
    //     } catch (err) {
    //         console.log(err);
    //     }
    //     setLike(isLiked ? like - 1 : like + 1);
    //     setIsLiked(!isLiked);
    // };

    //----------Modifier le comment-------------
    const handleComment = () => {
        setEditComment(!editComment);
    };
    const updateComment = async () => {
        // console.log(comment);
        // console.log(file);

        const editComment = {
            postId: post.comments.postId,
            userId: post.comments.userId,
            commentDesc: description,
            img: post.comments.img,
            //isAdmin: user.isAdmin,
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName); //key + value
            data.append("file", file);
            editComment.img = fileName;
            try {
                await axios.put(
                    `http://localhost:4000/api/comments/${post._id}}`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${currentUser.token}`,
                        },
                    }
                );
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.put(
                `http://localhost:4000/api/comments/${post._id}`,
                editComment,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    //--------delete------
    const deletecomment = async () => {
        const result = window.confirm("Êtes-vous sûr de vouloir supprimer?");
        try {
            await axios.delete(
                `http://localhost:4000/api/comments/${post.comments._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                    data: { userId: currentUser.userId },
                }
            );
            if (result) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${userP.username}`}>
                            <img
                                src={
                                    userP.profilePicture
                                        ? PUBLIC_FOLDER + userP.profilePicture
                                        : PUBLIC_FOLDER + "person/Anonym.svg"
                                }
                                alt="icon de l'utilisateur"
                                className="postProfileimg"
                            />
                        </Link>
                        <span className="postUserName">{userP.username}</span>
                        <span className="postDate">
                            {format(post.comments.createdAt)}
                            {/* {comments.createdAt} */}
                        </span>
                    </div>
                    {(post.comment.userId === currentUser.userId ||
                        user.isAdmin) && (
                        <nav className="postTopRight">
                            <div className="postNav">
                                <MoreHoriz />
                            </div>
                            <ul className="postNavList">
                                <li
                                    onClick={() => handleComment()}
                                    className="postNavEdit"
                                >
                                    <ModeEdit htmlColor="blue" />
                                    <span className="postNavSpan">
                                        Modifier
                                    </span>
                                </li>
                                <li
                                    onClick={() =>
                                        deletecomment(post.comments.userId)
                                    }
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
                    {editComment ? (
                        <>
                            <div className="sharepost">
                                <textarea
                                    type="text"
                                    className="shareInput"
                                    defaultValue={post.comments.commentDesc}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                            </div>
                            <hr className="shareHr" />

                            <form
                                className="shareButtons"
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
                                            // className="shareInputImg"
                                            type="file"
                                            id="file"
                                            accept=".png, .jpeg, .jpg"
                                            onChange={(e) =>
                                                // console.log(e)
                                                setFile(e.target.files[0])
                                            }
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
                                <button
                                    className="shareButton"
                                    onClick={updateComment}
                                    type="button"
                                >
                                    Publier
                                </button>
                            </form>
                        </>
                    ) : (
                        <span className="postText">
                            {post.comments.commentDesc}
                        </span>
                    )}
                    {post.comments.img && (
                        <img
                            src={PUBLIC_FOLDER + post.comments.img}
                            alt="Liée au commente"
                            className="postImg"
                        />
                    )}

                    {/* <div className="postBottom">
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
                    </div> */}
                </div>
            </div>
        </section>
    );
};
