import {
    AddAPhoto,
    DeleteForever,
    GifBox,
    ModeEdit,
    MoreHoriz,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./Comment.css";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export const Comment = ({ descComment, user, currentUser }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [userP, setUserP] = useState({}); //user = pour obetenir les infos de proprietaire de comment.
    const [editComment, setEditComment] = useState(false);
    const [file, setFile] = useState(null);
    const [imgPost, setImgPost] = useState("");
    const [description, setDescription] = useState(descComment.description);
    const [validPost, setValidPost] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                `http://localhost:4000/api/users?userId=${descComment.userId}`, //userId=proprietaire de comment.
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            setUserP(res.data);
        };
        fetchUser();
    }, [descComment.userId, currentUser]);

    //----------Modifier le comment-------------
    const handleComment = () => {
        setEditComment(!editComment);
    };
    const updateComment = async () => {
        const editComment = {
            postId: descComment.postId,
            userId: descComment.userId,
            commentDesc: description,
            img: descComment.img,
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName); //key + value
            data.append("file", file);
            editComment.img = fileName;
            try {
                await axios.put(
                    `http://localhost:4000/api/comments/${descComment._id}}`,
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
                `http://localhost:4000/api/comments/${descComment._id}`,
                editComment,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            window.location.reload();
        } catch (err) {
            setValidPost(err.response.data.message);
            console.log(err);
        }
    };
    const showSelectedPhoto = (e) => {
        setImgPost(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        e.target.value = "";
    };
    const onClickSwitchShowImg = () => {
        setImgPost("");
        setFile(null);
    };

    //--------delete------
    const deletecomment = async () => {
        const result = window.confirm("Êtes-vous sûr de vouloir supprimer?");
        try {
            await axios.delete(
                `http://localhost:4000/api/comments/${descComment._id}`,
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
        <section className="post comment">
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
                            {format(descComment.createdAt)}
                            {/* {comments.createdAt} */}
                        </span>
                    </div>
                    {(descComment.userId === currentUser.userId ||
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
                                        deletecomment(descComment.userId)
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

                <div className="postCenter commentCenter">
                    {editComment ? (
                        <>
                            <div className="sharepost commentText">
                                <textarea
                                    type="text"
                                    className="shareInput commentInput"
                                    defaultValue={descComment.commentDesc}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Écrivez un commentaire"
                                ></textarea>
                            </div>
                            <span className="shareValidPost">{validPost}</span>
                            {<hr className="shareHr commentHr" />}

                            {
                                <form
                                    className=" shareButtons"
                                    encType="multipart/form-data"
                                >
                                    <div className="shareOptions commentOptions">
                                        <label className="shareOption">
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
                                                accept=".png, .jpeg, .jpg"
                                                onChange={(e) =>
                                                    showSelectedPhoto(e)
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
                                        className="shareButton commentShareButton"
                                        onClick={updateComment}
                                        type="button"
                                    >
                                        Publier
                                    </button>
                                </form>
                            }
                            <div className="showImg">
                                {file && (
                                    <>
                                        <img
                                            src={imgPost}
                                            className="showImgSelected"
                                            alt="Afficher la sélection"
                                        />
                                        <button
                                            onClick={onClickSwitchShowImg}
                                            className="profileShowButton"
                                        >
                                            x Annuler
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <span className="postText">
                            {descComment.commentDesc}
                        </span>
                    )}
                    {descComment.img && (
                        <img
                            src={PUBLIC_FOLDER + descComment.img}
                            alt="Liée au commente"
                            className="postImg commentImg"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
