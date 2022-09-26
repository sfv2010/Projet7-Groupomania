//gerer en global . Définition de l'état initial
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//Definir l'état initial de l'utilisateur  -l'etat avant connecté-
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

//Gérer l'état globalement
export const AuthContext = createContext(initialState); // grâce à create-, on peut utiliser "initialState" n'import auel comport

export const AuthContextProvider = ({ children }) => {
    //state = état actuel.  connecté, avant-connecté ou échoué ?
    //dispatch = Envoyer des données,  appeler des fonctions

    const [state, dispatch] = useReducer(AuthReducer, initialState); //fn useReduceur=reduceur ,initialeState = etat initiale,Authreduceur=nouvel etat

    //!!!!!!!!Enregistrement dans localstroge!!!!!!!!!!
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        //children = App qui peut maintenant utiliser value
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
