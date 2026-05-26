import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={`w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-gray-700 ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
