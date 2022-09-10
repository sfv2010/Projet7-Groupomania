import React from "react";
import "./Register.css";

export const Register = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <header className="loginLeft">
                    <h1>
                        <img
                            src="/assets/groupomania/icon-left-font-monochrome-white.svg"
                            alt=" Grand logo de Groupomania"
                            className="loginLogo"
                        />
                    </h1>
                    <p className="loginDescription">
                        Travaillons plus efficacement, ensemble
                    </p>
                </header>
                <div className="loginRight">
                    <div className="loginBox">
                        <p className="loginMsg">S’inscrire</p>
                        <input
                            type="text"
                            className="loginInput"
                            placeholder="Adresse e-mail"
                        />
                        <input
                            type="text"
                            className="loginInput"
                            placeholder="Nom ou pseudonyme"
                        />
                        <input
                            type="text"
                            className="loginInput"
                            placeholder="Mot de passe"
                        />
                        <input
                            type="text"
                            className="loginInput"
                            placeholder="Confirmation de mot de passe"
                        />

                        <button className="loginButton">S'inscrire</button>

                        <hr />
                        <p className="loginFailed">Déjà inscrit?</p>
                        <button className="loginRegister">Se connecter</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
