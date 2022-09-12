// 状態を監視する
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START": //loginstart no baai
            return {
                user: null, //新しい状態なのでユーザーはなし
                isFetching: true, // 情報を取得するのかしないのか　fetching=取りに行く、呼び出す
                error: false, //era-hamadanai
            };
        case "LOGIN_SUCCESS": //loginuser no baai
            return {
                user: action.payload, //ユーザーログインに成功した状態
                isFetching: false, // 情報を取得するのかしないのか
                error: false, //エラーなし
            };
        case "LOGIN_ERROR": //loginstart no baai
            return {
                user: null, //新しい状態なのでユーザーはなし
                isFetching: false, // 情報を取得するのかしないのか
                error: action.payload, //era-hamadanai
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};

export default AuthReducer;
