import { User } from 'lucide-react';

export default function Avatar({ src, alt = '', size = 'md', className = '' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };
  if (!src) {
    return (
      <div className={`${sizes[size]} rounded-full bg-gray-100 flex items-center justify-center ${className}`}>
        <User className="w-4 h-4 text-gray-400" />
      </div>
    );
  }
  return <img src={src} alt={alt} className={`${sizes[size]} rounded-full object-cover ${className}`} />;
}
