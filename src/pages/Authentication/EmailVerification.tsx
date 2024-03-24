import React, { useEffect } from 'react';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_EMAIL_VERIFICATION } from '../../constants/constant';
import { handleError, handleSuccess, setDataCookie } from '../../helper/helper';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { FE_AUTH_LOGIN, FE_DASHBOARD } from '../../constants/feEndpoint';

const EmailVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const signIn = useSignIn();

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
        const email = response.data.data.email;
        const fullName = response.data.data.fullName;
        if (signIn(setDataCookie(jwtToken, email, fullName))) {
          navigateTo(FE_DASHBOARD);
        } else {
          navigateTo(FE_AUTH_LOGIN);
        }
      } catch (error) {
        handleError(error);
        navigateTo(FE_AUTH_LOGIN);
      }
    };
    fetchData();
  }, []);

  const navigateTo = (url: string) => {
    setTimeout(() => {
      navigate(url);
    }, 2000);
  };

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
    </div>
  );
};

export default EmailVerification;
