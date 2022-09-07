import React from "react";
import "./Login.css";

export const Login = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <header className="loginLeft">
                    <h1>
                        <img
                            src="/assets/Groupomania /icon-left-font-monochrome-white.svg"
                            alt=" Grand logo de Groupomania"
                            className="loginLogo"
                        />
                    </h1>
                    <p className="loginDescription">
                        Réseau social d'entreprise de Groupomania
                    </p>
                </header>
                <div className="loginRight">
                    <div className="loginBox">
                        <p className="loginMsg">Connexion</p>
                        <input
                            type="text"
                            className="loginInput"
                            placeholder="Adresse e-mail"
                        />
                        <input
                            type="text"
                            className="loginInput"
                            placeholder="Mot de passe"
                        />

                        <button className="loginButton">Se connecter</button>
                        <p className="loginForget">Mot de passe oublié?</p>
                        <hr />
                        <p className="loginFailed">Pas de compte?</p>
                        <button className="loginRegister">
                            Créer nouveaux compte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
