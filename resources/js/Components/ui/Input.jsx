import { forwardRef } from 'react';

const Input = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all placeholder-gray-400 ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export default Input;
