const initialState = {
    userProfile: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          userProfile: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          userProfile: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;