//Définition d'actions basées sur l'entrée de l'utilisateur
export const LoginStart = (user) => ({
    type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user, //payload（データ本体）は任意につけた名前。
});
export const LoginError = (error) => ({
    type: "LOGIN_ERROR",
    payload: error,
});
export const Logout = () => ({
    type: "LOGOUT",
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const UnFollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});
