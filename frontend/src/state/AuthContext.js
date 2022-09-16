//gerer en global . Définition de l'état initial
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//Definir l'état initial de l'utilisateur
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

//Gérer l'état globalement
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
    //state = état actuel.  connecté, avant-connecté ou échoué ?
    //dispatch = Envoyer des données,  appeler des fonctions

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //!!!!!!!!Enregistrement dans localstroge!!!!!!!!!!
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
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
