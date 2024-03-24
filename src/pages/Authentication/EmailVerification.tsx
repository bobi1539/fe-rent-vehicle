import React, { useEffect, useState } from 'react';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AUTH_EMAIL_VERIFICATION } from '../../constants/constant';
import { handleError, handleSuccess, setCookie } from '../../helper/helper';

const EmailVerification: React.FC = () => {
  const location = useLocation();
  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const response = await axios.get(AUTH_EMAIL_VERIFICATION, {
          params: {
            token: token,
          },
        });
        handleSuccess(response);
        const jwtToken = response.data.data.token;
        setCookie(jwtToken);
      } catch (error) {
        handleError(error);
      } finally {
        setTimeout(() => {
          setIsRedirect(true);
        }, 2000);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-5 flex items-center justify-center h-screen">
      <div
        className="rounded-md border border-stroke bg-white shadow-default 
        dark:border-strokedark dark:bg-boxdark px-20 py-10"
      >
        <div className="flex justify-center mb-4">
          <img className="hidden dark:block" src={Logo} alt="Logo" />
          <img className="dark:hidden" src={LogoDark} alt="Logo" />
        </div>
        <h2 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2 mb-4">
          Verifikasi Email
        </h2>
        <div className="flex justify-center">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 
            border-solid border-primary border-t-transparent"
          ></div>
        </div>
      </div>
      {isRedirect && <Navigate replace to="/auth/signin" />}
    </div>
  );
};

export default EmailVerification;
