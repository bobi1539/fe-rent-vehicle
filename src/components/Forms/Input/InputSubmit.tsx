import React from 'react';

interface InputSubmitProps {
  value: string;
}

const InputSubmit: React.FC<InputSubmitProps> = ({ value }) => {
  return (
    <input
      type="submit"
      value={value}
      className="w-full cursor-pointer rounded-lg border border-primary 
        bg-primary p-4 text-white transition hover:bg-opacity-90"
    />
  );
};

export default InputSubmit;
