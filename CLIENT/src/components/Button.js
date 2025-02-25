import React from 'react';

const Button = ({ onClick, disabled, variant, status, width, children }) => {
  let buttonStyle = 'bg-gray-300 text-gray-800';
  let buttonWidth = width ? width : 'w-[160px]';

  if (variant === 'primario') {
    buttonStyle = 'bg-gray-800 hover:bg-gray-900 text-white';
  } else if (variant === 'secundario') {
    buttonStyle = 'bg-gray-500 hover:bg-gray-600 text-white';
  }

  if (status === 'loading') {
    buttonStyle += ' opacity-50 cursor-not-allowed';
    children = (
        <svg className="animate-spin mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
          <circle className="opacity-0" cx="100" cy="1" r="100" stroke="currentColor" strokeWidth="3" />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.9623.042 1.135 5.824 3 7.938l3-2.647zM12 20.5A8.5 8.5 0 0020.5 12H18c0 2.756-1.244 5.236-3.188 6.938l-2.312-3.187z"
          />
        </svg>
      )
  } else if (status === 'success') {
    buttonStyle = 'bg-green-500 hover:bg-green-600 text-white';
;
  } else if (status === 'error') {
    buttonStyle = 'bg-red-500 hover:bg-red-600 text-white';
    children = (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-7a1 1 0 11-2 0V7a1 1 0 112 0v4zm0 4a1 1 0 11-2 0 1 1 0 012 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <button
    className={`py-2 px-4 rounded ${buttonStyle} ${buttonWidth} min-w-[100px] font-normal uppercase tracking-widest text-xs flex items-center justify-center`}
    onClick={onClick}
    disabled={disabled || status === 'loading'}
  >
    {status === 'loading' ? children : children}
  </button>
  );
};

export default Button;
