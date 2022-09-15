import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import { AddAPhoto, GifBox } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

export const Share = () => {
    const { user } = useContext(AuthContext);
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    console.log(file);

    //créer un post
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("http://localhost:4000/api/posts", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.post("http://localhost:4000/api/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <main className="share">
            <div className="shareWrapper">
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
                        <input
                            type="text"
                            className="shareInput"
                            placeholder="Quoi de neuf?"
                            ref={desc}
                        />
                    </div>
                </div>
                <hr className="shareHr" />
                <form
                    className="shareButtons"
                    onSubmit={(e) => handleSubmit(e)}
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
                                accept=".png, .jpeg, .jpg, .svg"
                                onChange={(e) => setFile(e.target.files[0])}
                                name="file"
                            />
                        </label>
                        <div className="shareOption">
                            <GifBox className="shareIcon" htmlColor="red" />
                            <span className="shareOptionText">GIF</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Publier
                    </button>
                </form>
            </div>
        </main>
    );
};
