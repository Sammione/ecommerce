import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    let baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-none';
    
    const variants = {
      primary: 'bg-[var(--color-brand-navy)] text-[var(--color-brand-cream)] hover:bg-[var(--color-brand-purple)]',
      secondary: 'bg-[var(--color-brand-purple)] text-white hover:opacity-90',
      outline: 'border border-[var(--color-brand-navy)] text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-navy)] hover:text-[var(--color-brand-cream)]',
      ghost: 'hover:bg-gray-100 hover:text-[var(--color-brand-navy)] text-gray-700',
    };
    
    const sizes = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-8 text-sm uppercase tracking-widest',
      lg: 'h-14 px-10 text-base uppercase tracking-widest',
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button ref={ref} className={combinedClasses} {...props} />
    );
  }
);

Button.displayName = 'Button';
