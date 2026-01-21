import { hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { ComponentPropsWithoutRef } from 'react';
import { SimpleIcon } from 'simple-icons';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary';
  icon?: SimpleIcon;
};

export default function PrimaryButton({
  children,
  icon,
  variant = 'primary',
}: ButtonProps) {
  return (
    <button
      className={cn(
        'cursor-pointer',
        'flex items-center justify-center gap-3 max-w-70 px-4 py-3',
        'shadow-2xl',
        hoverLiftStyle,
        variant === 'primary' ? 'bg-dark-gray rounded-full' : '',
      )}
    >
      {icon && (
        <div
          className={'w-6 h-6 fill-white'}
          dangerouslySetInnerHTML={{ __html: icon.svg }}
        />
      )}
      {children}
    </button>
  );
}
