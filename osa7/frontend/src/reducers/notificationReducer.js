const initialState = [];
let idCounter = 0;

const reducer = (state = initialState, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, action.data];
    case 'REMOVE_NOTIFICATION':
      return state.filter(n => n.id !== action.data);
    case 'SET_NOTIFICATIONS':
      return action.data;
    default:
      return state;
  }
};

export const createNotification = (message, mode, timeout = 2000) => {
  return (dispatch) => {
    const id = idCounter++;
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: { id, message, mode },
    });
    setTimeout(() => dispatch({
      type: 'REMOVE_NOTIFICATION',
      data: id,
    }), timeout);
  };
};

export const clearNotifications = () => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATIONS',
      data: [],
    });
  };
};

export default reducer;