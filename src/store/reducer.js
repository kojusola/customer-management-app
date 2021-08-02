const { SET_AUTH_USER } = require("./actionTypes");

const appStoreReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_AUTH_USER:
            return { ...state, authUser: payload.data };
        default:
            return state;
    }

}
export default appStoreReducer;