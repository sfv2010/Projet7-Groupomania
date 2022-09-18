// surveiller l'état
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START": //loginstart no baai
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
            return state;
    }
};

export default AuthReducer;
