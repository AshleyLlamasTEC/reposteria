export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg';
  const variants = {
    primary: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700',
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
