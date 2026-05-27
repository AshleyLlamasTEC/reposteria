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

import React from 'react';

export function Avatar({ 
    src, 
    alt, 
    fallback, 
    size = 'md', 
    className = '' 
}) {
    const sizes = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl'
    };

    const [imageError, setImageError] = React.useState(false);

    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold ${className}`}>
            {!imageError && src ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full rounded-full object-cover"
                    onError={() => setImageError(true)}
                />
            ) : (
                <span>{fallback ? getInitials(fallback) : '?'}</span>
            )}
        </div>
    );
}

export function AvatarFallback({ children }) {
    return <span>{children}</span>;
}