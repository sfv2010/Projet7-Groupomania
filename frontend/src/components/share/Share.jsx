import React, { useContext, useEffect, useRef, useState } from "react";
import "./Share.css";
import { AddAPhoto } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

export const Share = () => {
    const { user: currentUser } = useContext(AuthContext);
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [imgPost, setImgPost] = useState("");
    const [user, setUser] = useState({});
    const [validPost, setValidPost] = useState("");

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
        };
        fetchUser();
    }, [currentUser]);

    const showSelectedPhoto = (e) => {
        setImgPost(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        e.target.value = "";
    };
    const onClickSwitchShowImg = () => {
        setImgPost("");
        setFile(null);
    };

    //créer un post
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData(); //fonction qui peut avoir la data avec "key + value"
            const fileName = Date.now() + file.name; //pour eviter avoir le même nom,on ajoute Date.now
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await axios.post("http://localhost:4000/api/posts", data, {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
            } catch (err) {
                console.log(err);
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
            setValidPost(err.response.data.message);
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
                                onChange={(e) => showSelectedPhoto(e)}
                                name="file"
                            />
                        </label>

                        {/* <div className="shareOption gif">
                            <GifBox className="shareIcon" htmlColor="red" />
                            <span className="shareOptionText">GIF</span>
                        </div> */}
                    </div>
                    <button className="shareButton" type="submit">
                        Publier
                    </button>
                </form>

                {file && (
                    <div className="showImg">
                        <img
                            src={imgPost}
                            className="showImgSelected"
                            alt="Afficher la sélection"
                        />
                        <span onClick={onClickSwitchShowImg} className="profileShowButton">
                            Annuler
                        </span>
                    </div>
                )}
            </div>
        </main>
    );
};
