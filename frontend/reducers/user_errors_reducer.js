import { RECEIVE_USER_ERRORS,
         RECEIVE_USER,
         RECEIVE_USERS,
         CLEAR_USER_ERRORS} from '../actions/user_actions';

const UserErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors.responseJSON;
    case RECEIVE_USERS:
      return [];
    case RECEIVE_USER:
      return [];
    case CLEAR_USER_ERRORS:
      return [];
    default:
      return state;
  }
};

export default UserErrorsReducer;
