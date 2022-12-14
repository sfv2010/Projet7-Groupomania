// surveiller l'état
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START": //en cas de Login start
            return {
                user: null, //Nouvel état ＝ pas d'utilisateurs
                isFetching: true, //fetching = aller chercher
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false, //parce que c'est fini
                error: false,
            };
        case "LOGIN_ERROR":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        // case "UPLOAD_PICTURE":
        //     return {
        //         ...state,
        //         picture: action.payload,
        //     };
        // case "UPDATE_BIO":
        //     return {
        //         ...state,
        //         bio: action.payload,
        //     };
        // case "FOLLOW":
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             followings: [...state.user.following, action.payload],
        //         },
        //     };
        // case "UNFOLLOW":
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             followings: state.user.followings.filter(
        //                 (following) => following !== action.payload
        //             ),
        //         },
        //     };
        default:
            return state; //renvoyer nouvelle etat
    }
};

export default AuthReducer;
