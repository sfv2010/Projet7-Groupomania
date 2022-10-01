import { AddAPhoto } from "@mui/icons-material";
import axios from "axios";
import React, { memo, useRef, useState } from "react";
import "./CommentShare.css";

export const CommentShare = memo(({ post, user, currentUser }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [imgPost, setImgPost] = useState("");
    const [validPost, setValidPost] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            userId: user._id,
            commentDesc: desc.current.value,
            postId: post._id,
        };
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
    const showSelectedPhoto = (e) => {
        setImgPost(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        e.target.value = "";
    };
    const onClickSwitchShowImg = () => {
        setImgPost("");
        setFile(null);
    };

    return (
        <main className="share">
            <div className="commentShare">
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
                            type="text"
                            className="shareInput"
                            placeholder="Écrivez un commentaire"
                            ref={desc}
                        ></textarea>
                    </div>
                </div>
                <span className="shareValidPost">{validPost}</span>
                <hr className="shareHr commentHr" />
                <form
                    className="shareButtons"
                    onSubmit={(e) => handleSubmit(e)}
                    encType="multipart/form-data"
                >
                    <div className="shareOptions commentOptions">
                        <div className="shareOption">
                            <label className="shareOption">
                                <AddAPhoto
                                    className="shareIcon"
                                    htmlColor="blue"
                                />
                                <span className="shareOptionText">Photo</span>
                                <input
                                    className="shareInputImg"
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={(e) => showSelectedPhoto(e)}
                                    name="file"
                                />
                            </label>
                        </div>

                        {/* <div className="shareOption">
                            <GifBox className="shareIcon" htmlColor="red" />
                            <span className="shareOptionText">GIF</span>
                        </div> */}
                    </div>
                    <button className="shareButton" type="submit">
                        Publier
                    </button>
                </form>
                <div className="showImg">
                    {file && (
                        <>
                            <img
                                src={imgPost}
                                className="showImgSelected "
                                alt="Afficher la sélection"
                            />
                            <button
                                onClick={onClickSwitchShowImg}
                                className="profileShowButton"
                            >
                                Annuler
                            </button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
});
