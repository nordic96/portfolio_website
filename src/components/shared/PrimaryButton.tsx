import { hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { ComponentPropsWithoutRef } from 'react';
import { SimpleIcon } from 'simple-icons';

type BaseProps = {
  variant?: 'primary' | 'secondary';
  icon?: SimpleIcon;
  size?: 'default' | 'small';
};

type ButtonProps = BaseProps &
  ComponentPropsWithoutRef<'button'> & {
    as?: 'button';
    href?: never;
  };

type LinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
    as: 'link';
    href: string;
  };

type PrimaryButtonProps = ButtonProps | LinkProps;

/**
 * PrimaryButton - Shared button component with optional link variant
 *
 * Features:
 * - Two variants: primary (filled) and secondary (outline)
 * - Two sizes: default and small
 * - Optional SimpleIcon support
 * - Can render as button or anchor link
 * - Minimum 44px touch target for accessibility
 */
export default function PrimaryButton({
  children,
  icon,
  variant = 'primary',
  size = 'default',
  className,
  ...props
}: PrimaryButtonProps) {
  const baseStyles = cn(
    'cursor-pointer',
    'flex items-center justify-center gap-2',
    'font-medium text-white',
    'transition-all duration-200',
    hoverLiftStyle,
    // Size variants - ensure 44px minimum touch target
    size === 'default'
      ? 'px-5 py-3 text-sm min-h-11'
      : 'px-4 py-2 text-xs min-h-11',
    // Variant styles
    variant === 'primary'
      ? 'bg-dark-gray rounded-full shadow-lg hover:shadow-xl'
      : 'bg-transparent border border-white/30 rounded-full hover:bg-white/10',
    className,
  );

  const iconElement = icon && (
    <div
      className={cn(
        'fill-white shrink-0',
        size === 'default' ? 'w-5 h-5' : 'w-4 h-4',
      )}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
      aria-hidden="true"
    />
  );

  // Render as link
  if ('as' in props && props.as === 'link') {
    const { href, ...linkProps } = props as LinkProps;
    return (
      <a
        href={href}
        className={baseStyles}
        target="_blank"
        rel="noopener noreferrer"
        {...linkProps}
      >
        {iconElement}
        {children}
      </a>
    );
  }

  // Render as button (default)
  const { ...buttonProps } = props as ButtonProps;
  return (
    <button className={baseStyles} {...buttonProps}>
      {iconElement}
      {children}
    </button>
  );
}
