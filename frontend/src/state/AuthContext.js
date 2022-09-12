//gerer en global . Définition de l'état initial
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//Definir l'état initial de l'utilisateur
const initialState = {
    //user: null,
    user: {
        _id: "631f1a4b1123b5dd9b5e5e17",
        username: "aoisora",
        email: "aoi@hotmail.fr",
        password: "Aoaoao12",
        firstName: "false",
        lasttName: "false",
        profilePicture: "",
        coverPicture: "",
        followers: [],
        followings: [],
        isAdmin: false,
    },
    isFetching: false,
    error: false,
};

//Gérer l'état globalement
export const AuthContext = createContext(initialState);
export const AuthContextProvider = ({ children }) => {
    //state = 今の状態。ログインしているのか、する前か、失敗したか？
    //dispatch = どういうアクションを実行したか。アクション名をつけると発火する。
    //データの送信、資源の割り当て、機能の呼び出し
    const [state, dispatch] = useReducer(AuthReducer, initialState);
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
