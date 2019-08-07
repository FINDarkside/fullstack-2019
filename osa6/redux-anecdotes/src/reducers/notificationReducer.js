const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const clearNotification = () => ({
    type: 'SET_NOTIFICATION',
    data: null
})

let lastTimeout = null;
export const setNotification = (notification, timeout) => {
    return async (dispatch) => {
        clearTimeout(lastTimeout)
        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification,
        })
        lastTimeout = setTimeout(() => dispatch(clearNotification()), timeout)
    }
}

export default reducer