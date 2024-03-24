import React, { ChangeEvent } from 'react';
import { IconType } from 'react-icons';

interface InputWithRightIconProps {
  label: string;
  type: string;
  name: string;
  placeHolder: string;
  isRequired: boolean;
  icon: IconType;
  onChange: (name: string, value: any) => void;
  value: any;
}

const InputWithRightIcon: React.FC<InputWithRightIconProps> = ({
  label,
  type,
  name,
  placeHolder,
  isRequired,
  icon: IconComponent,
  onChange,
  value,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeHolder}
          className="w-full rounded-lg border border-stroke bg-transparent 
            py-4 pl-6 pr-10 text-black outline-none focus:border-primary 
            focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input 
            dark:text-white dark:focus:border-primary"
          required={isRequired}
          onChange={handleChange}
          value={value}
        />

        <span className="absolute right-4 top-4">
          <div className="opacity-50">
            <IconComponent size="22px" />
          </div>
        </span>
      </div>
    </div>
  );
};

export default InputWithRightIcon;
