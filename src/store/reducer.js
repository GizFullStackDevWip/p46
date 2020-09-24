import * as actionTypes from './actions';

const initial_state = {
    loginBlock: 'block',
    userBlock: 'none',
    liveButton: false
};

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                userBlock: 'block',
                loginBlock: 'none'

            };
        case actionTypes.LOGOUT:
            return {
                userBlock: 'none',
                loginBlock: 'block'
            };
        case actionTypes.LIVEBUTTON:
            return {
                liveButton: !state.liveButton
            };
        default:
            return state;
    }
}

export default reducer;