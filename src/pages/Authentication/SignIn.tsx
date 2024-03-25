import React, { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import LeftAuth from '../../components/LeftAuth';
import InputWithRightIcon from '../../components/Forms/Input/InputWithRightIcon';
import { CiLock } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import InputSubmit from '../../components/Forms/Input/InputSubmit';
import ButtonWithGoogle from '../../components/Button/ButtonWithGoogle';
import axios from 'axios';
import { handleError, handleSuccess, setDataCookie } from '../../helper/helper';
import {
  AUTH_LOGIN,
  AUTH_REGISTER_EMAIL,
  GOOGLE_APIS_PROFILE,
} from '../../constants/constant';
import {
  FE_AUTH_LOGIN,
  FE_AUTH_REGISTER,
  FE_DASHBOARD,
} from '../../constants/feEndpoint';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUserFromGoogle } from '../../store/action';
import { toast } from 'react-toastify';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (name: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password,
    };

    axios
      .post(AUTH_LOGIN, userData)
      .then((response) => {
        handleSuccess(response);
        const token = response.data.data.token;
        const email = response.data.data.email;
        const fullName = response.data.data.fullName;

        if (signIn(setDataCookie(token, email, fullName))) {
          navigate(FE_DASHBOARD);
        } else {
          navigate(FE_AUTH_LOGIN);
        }

        setData(emptyData());
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const emptyData = () => {
    return {
      email: '',
      password: '',
    };
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.get(GOOGLE_APIS_PROFILE, {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        processLoginWithGoogle(response.data.email, response.data.name);
      } catch (error) {
        handleError(error);
      }
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const processLoginWithGoogle = (email: string, name: string): void => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const data = {
      apiKey: apiKey,
      email: email,
    };

    axios
      .post(AUTH_REGISTER_EMAIL, data)
      .then((response) => {
        const isRegistered = response.data.data.registered;
        if (isRegistered) {
          toast.info('Silahkan Masukkan Password Untuk Login');
          setData({
            email: email,
            password: '',
          });
        } else {
          dispatch(setUserFromGoogle(email, name, true, true));
          navigate(FE_AUTH_REGISTER);
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return isAuthenticated ? (
    <Navigate to={FE_DASHBOARD} />
  ) : (
    <div className="mx-5 my-10">
      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <LeftAuth />
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Login
              </h2>
              <form method="POST" onSubmit={handleLogin}>
                <InputWithRightIcon
                  label="Email"
                  type="email"
                  name="email"
                  placeHolder="Masukkan email anda"
                  isRequired={true}
                  icon={CiMail}
                  onChange={handleInputChange}
                  value={data.email}
                />
                <InputWithRightIcon
                  label="Password"
                  type="password"
                  name="password"
                  placeHolder="Masukkan password"
                  isRequired={true}
                  icon={CiLock}
                  onChange={handleInputChange}
                  value={data.password}
                />
                <div className="mb-5">
                  <InputSubmit value="Login" />
                </div>
                <ButtonWithGoogle
                  onClick={() => loginWithGoogle()}
                  label="Login Dengan Google"
                />
                <div className="mt-6 text-center">
                  <p>
                    Belum Punya Akun?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Daftar Sekarang
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
