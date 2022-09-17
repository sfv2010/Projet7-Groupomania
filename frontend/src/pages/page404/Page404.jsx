import React from "react";
import { Link } from "react-router-dom";
import { Topbar } from "../../components/topbar/Topbar";
import "./Page404.css";
const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

export const Page404 = () => {
    return (
        <>
            <Topbar />
            <main className="errorWrapper">
                <div className="errorText">
                    <h1 className="errorTitle">Error 404</h1>
                    <p className="errorDesc">
                        {" "}
                        Désolé, cette page n'existe pas..
                    </p>
                    <button className="errorButton">
                        <Link to="/" className="errorLink">
                            Veuillez revenir à la page d'accueil
                        </Link>
                    </button>
                </div>
                <img
                    src={PUBLIC_FOLDER + "person/404.jpg"}
                    className="errorImg"
                    alt="Fennec"
                />
            </main>
        </>
    );
};
