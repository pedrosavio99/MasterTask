import React from 'react';

const Input = ({ label, name, type, value, onChange, error, maxLength }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-base font-semibold">{label}</label>
      <input
        className={`mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        type={type}
        name={name}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
