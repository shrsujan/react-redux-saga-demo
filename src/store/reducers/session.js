import * as actions from '../../constants/actions';

const initialState = {
  user: null,
  error: null
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case actions.FILL_USER_PROFILE:
      return {
        ...state,
        user: { ...action.payload }
      };

    case actions.CLEAR_SESSION:
      return { ...initialState };

    case actions.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default session;
