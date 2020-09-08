export function reducer(state, action) {
    switch (action.type) {
        case 'ACTION': {
            return {
                ...state,
                user: state.user
            }
        }
        default: {
            return state
        }
    }
}