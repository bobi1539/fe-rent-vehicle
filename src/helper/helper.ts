import { toast } from 'react-toastify';
import { JWT_TOKEN } from '../constants/constant';
import Cookies from 'js-cookie';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

function handleSuccess(response: any) {
  const successMessage = response.data.message.split('|')[1];
  toast.success(successMessage);
}

function handleError(error: any) {
  let message = 'Error';
  if (error.response) {
    message = error.response.data.message.split('|')[1];
  } else if (error.request) {
    console.error('Request Not Answered : ', error.request);
    message = 'Request Not Answered';
  } else {
    console.error('Error : ', error);
  }

  toast.error(message);
}

function setDataCookie(token: string, email: string, fullName: string) {
  return {
    auth: {
      token: token,
      type: 'Bearer',
    },
    refresh: '',
    userState: {
      email: email,
      fullName: fullName,
    },
  };
}

export { handleSuccess, handleError, setDataCookie };
