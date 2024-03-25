import { SET_USER_FROM_GOOGLE } from './actionType';

interface UserFromGoogleState {
  email: string;
  fullName: string;
  isFromGoogle: boolean;
  isInputDisabled: boolean;
}

const initialState: UserFromGoogleState = {
  email: '',
  fullName: '',
  isFromGoogle: false,
  isInputDisabled: false,
};

const userFromGoogleReducer = (
  state = initialState,
  action: any,
): UserFromGoogleState => {
  switch (action.type) {
    case SET_USER_FROM_GOOGLE:
      return {
        ...state,
        email: action.payload.email,
        fullName: action.payload.fullName,
        isFromGoogle: action.payload.isFromGoogle,
        isInputDisabled: action.payload.isInputDisabled,
      };
    default:
      return state;
  }
};

export default userFromGoogleReducer;
