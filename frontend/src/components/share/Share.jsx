import React, { useContext, useEffect, useRef, useState } from "react";
import "./Share.css";
import { AddAPhoto, GifBox } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

export const Share = () => {
    const { user: currentUser } = useContext(AuthContext);
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [user, setUser] = useState({});
    const [validPost, setValidPost] = useState("");

    // console.log(file);

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

    //créer un post
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData(); //fonction qui peut avoir la data avec "key + value"
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await axios.post("http://localhost:4000/api/posts", data, {
                    headers: {
                        //"Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
            } catch (err) {
                console.log(err);
                // setValidPost("Le post doit contenir du texte");
            }
        }
        try {
            await axios.post("http://localhost:4000/api/posts", newPost, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });
            window.location.reload();
        } catch (err) {
            setValidPost("Le post doit contenir du texte");
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
                        <textarea
                            type="text"
                            className="shareInput"
                            placeholder="Quoi de neuf?"
                            ref={desc}
                        ></textarea>
                    </div>
                </div>
                <span className="shareValidPost">{validPost}</span>
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
                                accept=".png, .jpeg, .jpg"
                                onChange={(e) => setFile(e.target.files[0])} //setFile=useState
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
