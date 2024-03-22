import React from 'react';
import IconGoogle from '../Icon/IconGoogle';

interface ButtonWithGoogleProps {
  label: string;
}

const ButtonWithGoogle: React.FC<ButtonWithGoogleProps> = ({ label }) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3.5 
    rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 
    dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
    >
      <IconGoogle />
      {label}
    </button>
  );
};

export default ButtonWithGoogle;
