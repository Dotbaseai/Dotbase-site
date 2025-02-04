import React from 'react';

type FieldSchemaType = {
  field: React.ReactElement;
  errors?: string;
};
const FieldSchema: React.FC<FieldSchemaType> = ({ field, errors }) => {
  return (
    <div className="pt-2">
      {field}
      <span className="text-red-500 text-xs">{errors}</span>
    </div>
  );
};

type InputFieldProps = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  placeholder?: string;
};
export const InputField: React.FC<InputFieldProps> = ({ label, type, onChange, value, required, placeholder }) => {
  const requiredString = required ? '*' : '';

  return (
    <div className="grid grid-cols-2">
      <p>
        {label}
        {requiredString}
      </p>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="px-1 bg-[#1a1a1a] rounded-sm text-gray-400 border border-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:bg-black focus:border-[#4e1183] w-full text-sm "
      />
    </div>
  );
};

type Props = {
  label: string;
  selected: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};
export const SelectField: React.FC<Props> = ({ selected, onChange, options, label, required }) => {
  const requiredString = required ? '*' : '';

  return (
    <div className="grid grid-cols-2">
      <p>
        {label}
        {requiredString}
      </p>
      <select
        value={selected}
        onChange={onChange}
        className="bg-[#1a1a1a] text-gray-400 border border-[#1a1a1a] text-sm rounded-sm focus:border-teal-500 outline-none"
      >
        {options.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FieldSchema;
