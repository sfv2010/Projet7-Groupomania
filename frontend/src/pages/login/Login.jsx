import React, { useContext, useRef, useState } from "react";
import { dispatchLogin } from "../../state/dispatch";
import { AuthContext } from "../../state/AuthContext";
import "./Login.css";
import { Link } from "react-router-dom";

export const Login = () => {
    const email = useRef();
    const password = useRef();
    const { dispatch } = useContext(AuthContext);
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [passwErr, setPasswErr] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            email !== email.current.value ||
            password !== password.current.value
        ) {
            setPasswErr("Paire identifiant/mot de passe incorrecte");
        }
        dispatchLogin(
            {
                email: email.current.value,
                password: password.current.value,
            },
            dispatch
        );
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <header className="loginLeft">
                    <h1>
                        <img
                            src={
                                PUBLIC_FOLDER +
                                "groupomania /icon-left-font-monochrome-white.svg"
                            }
                            alt=" Grand logo de Groupomania"
                            className="loginLogo"
                        />
                    </h1>
                    <p className="loginDescription">
                        Travaillons plus efficacement, ensemble
                    </p>
                </header>
                <div className="loginRight">
                    {/* ggràce à form on peut utiliser onSubmit */}
                    <form
                        className="loginBox"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <p className="loginMsg">Connexion</p>
                        <input
                            type="email"
                            className="loginInput"
                            placeholder="Adresse e-mail"
                            required
                            ref={email} //useRef:il réfere type-required
                        />
                        <input
                            type="password"
                            className="loginInput"
                            placeholder="Mot de passe"
                            required
                            ref={password}
                        />
                        <span className="loginPasswErr">{passwErr}</span>

                        <button className="loginButton">Se connecter</button>
                        <p className="loginForget">Mot de passe oublié?</p>
                        <hr />
                        <p className="loginFailed">Pas de compte?</p>
                        <Link to="/register">
                            <button className="loginRegister">
                                Créer nouveaux compte
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
