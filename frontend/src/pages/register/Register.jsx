import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [passwErr, setPasswErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Vérifiez si le mot de passe et le mot de passe de confirmation sont corrects
        if (password.current.value !== confirmPassword.current.value) {
            setPasswErr("Les paires de mots de passe ne sont pas identiques");
        } else {
            //Appeler registerAPI
            try {
                const user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                };
                await axios.post("http://localhost:4000/api/auth/register", user);
                navigate("/login");
            } catch (err) {
                setPasswErr(err.response.data.message);
                console.log(err);
            }
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <header className="loginLeft">
                    <h1>
                        <img
                            src={PUBLIC_FOLDER + "groupomania /icon-left-font-monochrome-white.svg"}
                            alt=" Grand logo de Groupomania"
                            className="loginLogo"
                        />
                    </h1>
                    <p className="loginDescription">Travaillons plus efficacement, ensemble</p>
                </header>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                        <p className="loginMsg">S’inscrire</p>
                        <input
                            type="email"
                            className="loginInput"
                            placeholder="Adresse e-mail"
                            required
                            ref={email}
                        />
                        <input
                            type="text"
                            className="loginInput"
                            placeholder="Nom ou pseudonyme"
                            required
                            ref={username}
                        />
                        <input
                            type="password"
                            className="loginInput"
                            placeholder="Mot de passe"
                            required
                            ref={password}
                        />
                        <input
                            type="password"
                            className="loginInput"
                            placeholder="Confirmation de mot de passe"
                            required
                            ref={confirmPassword}
                        />
                        <span className="loginPasswErr">{passwErr}</span>

                        <button className="loginButton" type="submit">
                            S'inscrire
                        </button>

                        <hr />

                        <p className="loginFailed">Déjà inscrit?</p>
                        <Link to="/login">
                            <button className="loginLink">Se connecter</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
