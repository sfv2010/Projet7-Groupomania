import React from "react";
import "./Post.css";

export const Post = () => {
    return (
        <section className="post">
            <div className="postWrapper">
                <div className="postTOp">
                    <img
                        src="/assets/person/chevalicon.jpg"
                        alt="icon de licorne"
                        className="postProfileimg"
                    />
                    <span className="postUsername">Savin</span>
                    <span></span>
                </div>
            </div>
        </section>
    );
};
