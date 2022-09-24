//---importation---
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/post"); // importe le routeur pour enregistrons notre routeur dans notre application
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");

const path = require("path"); //traiter les requêtes vers la route /image,

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();

//--- Sécuriser les requêtes HTML---
app.use(helmet()); // la methode express app.use s'exécute sur tous les types de requêtes HTTP .
app.use(mongoSanitize()); //Securiser contre l'injection NoSQL en supprimeant les caractères interdits

//--- Connecter mangooDB---
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

// Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--- CORS---
app.use(cors());
// app.use(cors({ origin: "http://localhost:4000" }));
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "same-site"); //pour afficher les images en utilisant helmet
    res.setHeader("Access-Control-Allow-Origin", "*"); // d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    ); //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc).
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS"); //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next(); // ne pas oublier de passer next!
});

//---Route---
app.use("/images", express.static(path.join(__dirname, "images"))); //le gestionnaire de routage
app.use("/api/posts", postRoutes); // premiere argument qui sera la route(l'endpoint )de posts sur notre API
app.use("/api/auth", authRoutes); //la route d'authentification.
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

//---Exportation---
module.exports = app; // exporter cette application pour qu'on puisse y acceder depuis les autres fichiers de notre projet
