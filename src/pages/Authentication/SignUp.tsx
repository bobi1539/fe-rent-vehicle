import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import LeftAuth from '../../components/LeftAuth';
import InputWithRightIcon from '../../components/Forms/Input/InputWithRightIcon';
import { CiUser } from 'react-icons/ci';
import { CiLock } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import InputSubmit from '../../components/Forms/Input/InputSubmit';
import ButtonWithGoogle from '../../components/Button/ButtonWithGoogle';
import axios from 'axios';
import { AUTH_REGISTER } from '../../constants/constant';
import { handleError } from '../../service/customAxios';
import { toast } from 'react-toastify';

const SignUp: React.FC = () => {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleInputChange = (name: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
    };

    axios
      .post(AUTH_REGISTER, userData)
      .then((response) => {
        console.log(response);
        setData(emptyData());
        toast.success(
          'Registrasi Berhasil. Silahkan Verifikasi Email Dengan Link Yang Telah Dikirim Ke Email.',
        );
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const emptyData = () => {
    return {
      fullName: '',
      email: '',
      password: '',
      repeatPassword: '',
    };
  };

  return (
    <div className="mx-5 my-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <LeftAuth />
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Daftar
              </h2>
              <form onSubmit={handleRegister}>
                <InputWithRightIcon
                  label="Nama Lengkap"
                  type="text"
                  name="fullName"
                  placeHolder="Masukkan nama lengkap anda"
                  isRequired={true}
                  icon={CiUser}
                  onChange={handleInputChange}
                  value={data.fullName}
                />
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
                <InputWithRightIcon
                  label="Ulangi Password"
                  type="password"
                  name="repeatPassword"
                  placeHolder="Ulangi password"
                  isRequired={true}
                  icon={CiLock}
                  onChange={handleInputChange}
                  value={data.repeatPassword}
                />
                <div className="mb-5">
                  <InputSubmit value="Buat Akun" />
                </div>
                <ButtonWithGoogle label="Daftar Dengan Google" />
                <div className="mt-6 text-center">
                  <p>
                    Sudah Punya Akun?{' '}
                    <Link to="/auth/signin" className="text-primary">
                      Login
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

export default SignUp;
