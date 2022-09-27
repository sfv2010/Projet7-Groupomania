import { AddAPhoto, GifBox } from "@mui/icons-material";
import axios from "axios";
import React, { useRef, useState } from "react";
import "./CommentShare.css";

export const CommentShare = ({ post, user, currentUser }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [validPost, setValidPost] = useState("");
    const [file, setFile] = useState(null);
    const [commentText, setCommentText] = useState("");

    console.log(post);
    console.log(user);
    console.log(currentUser);

    const handleClick = async (e) => {
        e.preventDefault();

        const newComment = {
            userId: user._id,
            commentDesc: desc.current.value,
            postId: post._id,
        };
        console.log(desc);
        if (file) {
            const data = new FormData(); //fonction qui peut avoir la data avec "key + value"
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newComment.img = fileName;
            try {
                await axios.post(
                    `http://localhost:4000/api/comments/${post._id}`,
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
            await axios.post(
                `http://localhost:4000/api/comments/${post._id}`,
                newComment,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            window.location.reload();
        } catch (err) {
            setValidPost("Le message doit contenir du texte");
            console.log(err);
        }
    };
    const onChangeComment = (e) => {
        setCommentText(e.target.value);
    };

    return (
        <div className="shareWrapper">
            <hr className="commentHr" />
            <div className="shareTop">
                <img
                    src={
                        user.profilePicture
                            ? PUBLIC_FOLDER + user.profilePicture
                            : PUBLIC_FOLDER + "/person/Anonym.svg"
                    }
                    alt="icon de User"
                    className="shareProfileImg"
                />

                <div className="sharePost">
                    <textarea
                        value={commentText}
                        onChange={onChangeComment}
                        type="text"
                        className="shareInput"
                        placeholder="Écrivez un commentaire"
                        ref={desc}
                    ></textarea>
                </div>
            </div>
            <span className="shareValidPost">{validPost}</span>
            <hr className="shareHr" />
            <form
                className="shareButtons"
                //onSubmit={(e) => handleSubmit(e)}
                encType="multipart/form-data"
            >
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <AddAPhoto className="shareIcon" htmlColor="blue" />
                        <span className="shareOptionText">Photo</span>
                        <input
                            className="shareInputImg"
                            type="file"
                            id="file"
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                            name="file"
                        />
                    </label>
                    <div className="shareOption">
                        <GifBox className="shareIcon" htmlColor="red" />
                        <span className="shareOptionText">GIF</span>
                    </div>
                </div>
                <button
                    className="shareButton"
                    type="text"
                    onClick={handleClick}
                >
                    Publier
                </button>
            </form>

            <div className="commentWrapper">
                {/* {post.comments.map((commentItem, index) => {
                    return (
                        <div key={index} className="commentMap">
                            <div>{commentItem.desc}</div>
                        </div>
                    );
                })} */}
                {/* {post.comment.map((commentItem, index) => (
                    <Comment commentItem={commentItem} key={index} />
                ))} */}
            </div>
        </div>
    );
};
