import React, { useRef } from "react";
import "./Login.css";

export const Login = () => {
    const email = useRef();
    const password = useRef();

    const handleSubmit = (e) => {
        e.preventDefault(); //pour ne pas reload
        console.log(email.current.value);
        console.log(password.current.value);
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <header className="loginLeft">
                    <h1>
                        <img
                            src="/assets/groupomania /icon-left-font-monochrome-white.svg"
                            alt=" Grand logo de Groupomania"
                            className="loginLogo"
                        />
                    </h1>
                    <p className="loginDescription">
                        Travaillons plus efficacement, ensemble
                    </p>
                </header>
                <div className="loginRight">
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
                            ref={email}
                        />
                        <input
                            type="password"
                            className="loginInput"
                            placeholder="Mot de passe"
                            required
                            ref={password}
                        />

                        <button className="loginButton">Se connecter</button>
                        <p className="loginForget">Mot de passe oublié?</p>
                        <hr />
                        <p className="loginFailed">Pas de compte?</p>
                        <button className="loginRegister">
                            Créer nouveaux compte
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
