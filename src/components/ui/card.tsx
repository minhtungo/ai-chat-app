import { cn } from '@/utils/cn';
import * as React from 'react';

interface CardProps extends React.ComponentProps<'div'> {
  keepPaddingOnMobile?: boolean;
}

function Card({ className, keepPaddingOnMobile, ...props }: CardProps) {
  return (
    <div
      data-slot='card'
      className={cn(
        'bg-card text-card-foreground rounded-xl',
        keepPaddingOnMobile
          ? 'border shadow-sm'
          : 'border-0 shadow-none sm:border sm:shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

interface CardHeaderProps extends React.ComponentProps<'div'> {
  keepPaddingOnMobile?: boolean;
}

function CardHeader({
  className,
  keepPaddingOnMobile,
  ...props
}: CardHeaderProps) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        'flex flex-col gap-1.5',
        keepPaddingOnMobile ? 'p-6' : 'pb-6 sm:p-6',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

interface CardContentProps extends React.ComponentProps<'div'> {
  keepPaddingOnMobile?: boolean;
}

function CardContent({
  className,
  keepPaddingOnMobile,
  ...props
}: CardContentProps) {
  return (
    <div
      data-slot='card-content'
      className={cn(
        keepPaddingOnMobile ? 'p-6 pt-0' : 'sm:p-6 sm:pt-0',
        className,
      )}
      {...props}
    />
  );
}

interface CardFooterProps extends React.ComponentProps<'div'> {
  keepPaddingOnMobile?: boolean;
}

function CardFooter({
  className,
  keepPaddingOnMobile,
  ...props
}: CardFooterProps) {
  return (
    <div
      data-slot='card-footer'
      className={cn(
        'flex items-center',
        keepPaddingOnMobile ? 'p-6 pt-0' : 'sm:p-6 sm:pt-0',
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
