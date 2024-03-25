import { SET_USER_FROM_GOOGLE } from './actionType';

export const setUserFromGoogle = (
  email: string,
  fullName: string,
  isFromGoogle: boolean,
  isInputDisabled: boolean,
) => ({
  type: SET_USER_FROM_GOOGLE,
  payload: {
    email,
    fullName,
    isFromGoogle,
    isInputDisabled,
  },
});
