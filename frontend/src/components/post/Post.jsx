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
import { CommentShare } from "../comment/CommentShare";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
    //recevoir props de timeline
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [userP, setUserP] = useState({}); //user = pour obetenir les infos de proprietaire de post.
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext); //on change le nom "user=>currentUser" pour distinguer entre user de useState.
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(
        !!post.likes.find((like) => like === currentUser.userId)
    ); //!!boolean
    const [editPost, setEditPost] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState(post.description);
    //const descComment = useRef();
    //console.log(post);

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

    const handleLike = async () => {
        try {
            //appeler API Liker
            await axios.put(
                `http://localhost:4000/api/posts/${post._id}/like`, //Identifiant de l'article
                currentUser.userId, //id de utilisateur
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            console.log(currentUser.userId);
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    //----------Modifier le post-------------
    const handlePost = () => {
        setEditPost(!editPost);
    };
    const updatePost = async () => {
        console.log(user);
        // console.log(file);

        const editPost = {
            userId: userP._id,
            desc: description,
            img: post.img,
            isAdmin: user.isAdmin,
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName); //key + value
            data.append("file", file);
            editPost.img = fileName;

            try {
                await axios.put(
                    `http://localhost:4000/api/posts/${post._id}`,
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
            console.log(editPost);
            await axios.put(
                `http://localhost:4000/api/posts/${post._id}`,
                editPost,
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
    const deletePost = async () => {
        try {
            window.confirm("Êtes-vous sûr de vouloir supprimer?") &&
                (await axios.delete(
                    `http://localhost:4000/api/posts/${post._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${currentUser.token}`,
                        },
                        data: { userId: currentUser.userId },
                    }
                ));
            // if (window.confirm) {
            window.location.reload();
            // }
        } catch (err) {
            console.log(err);
        }
    };

    //----------Coomentaire------

    const handleComment = () => {
        setShowComment(!showComment);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newComment = {
    //         userId: user._id,
    //         desc: descComment.current.value,
    //     };
    //     try {
    //         await axios.post("http://localhost:4000/api/comments", newComment, {
    //             headers: {
    //                 Authorization: `Bearer ${currentUser.token}`,
    //             },
    //         });
    //         window.location.reload();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

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
                            {format(post.createdAt)}
                            {/* {post.createdAt} */}
                        </span>
                    </div>
                    {(post.userId === currentUser.userId || user.isAdmin) && (
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
                                    onClick={updatePost}
                                    type="button"
                                >
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
                        <>
                            <CommentShare
                                user={user}
                                setUser={setUser}
                                setFile={setFile}
                                post={post}
                                // currentUser={currentUser}
                            />
                            {/* {post.map((comment) => (
                                <Post post={comment} key={comment._id} /> //._id = id de mongdb
                            ))} */}
                        </>
                        // <>
                        //     <div className="shareWrapper">
                        //         <hr className="shareHr" />
                        //         <form
                        //             className="shareButtons"
                        //             onSubmit={(e) => handleSubmit(e)}
                        //             encType="multipart/form-data"
                        //         >
                        //             <div className="shareTop">
                        //                 <img
                        //                     src={
                        //                         user.profilePicture
                        //                             ? PUBLIC_FOLDER +
                        //                               user.profilePicture
                        //                             : PUBLIC_FOLDER +
                        //                               "/person/Anonym.svg"
                        //                     }
                        //                     alt="icon de User"
                        //                     className="shareProfileImg"
                        //                 />
                        //                 <div className="sharePost">
                        //                     <textarea
                        //                         type="text"
                        //                         className="shareInput"
                        //                         placeholder=" Écrivez un commentaire"
                        //                         ref={descComment}
                        //                     />
                        //                 </div>
                        //                 <button
                        //                     className="shareButton"
                        //                     type="submit"
                        //                 >
                        //                     Publier
                        //                 </button>
                        //             </div>
                        //         </form>
                        //     </div>
                        // </>
                    )}
                </div>
            </div>
        </section>
    );
};
