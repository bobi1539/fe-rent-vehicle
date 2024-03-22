import { toast } from 'react-toastify';

function handlePostSuccess(response: any) {
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

export { handlePostSuccess, handleError };
