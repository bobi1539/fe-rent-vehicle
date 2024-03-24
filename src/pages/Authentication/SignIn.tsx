import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import LeftAuth from '../../components/LeftAuth';
import InputWithRightIcon from '../../components/Forms/Input/InputWithRightIcon';
import { CiLock } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import InputSubmit from '../../components/Forms/Input/InputSubmit';
import ButtonWithGoogle from '../../components/Button/ButtonWithGoogle';
import axios from 'axios';
import { handleError, handlePostSuccess } from '../../service/customAxios';
import { AUTH_LOGIN, JWT_TOKEN } from '../../constants/constant';
import Cookies from 'js-cookie';

const SignIn: React.FC = () => {
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
        handlePostSuccess(response);
        const token = response.data.data.token;
        Cookies.set(JWT_TOKEN, token, { expires: 365 });
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

  return (
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
                <ButtonWithGoogle label="Login Dengan Google" />
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
