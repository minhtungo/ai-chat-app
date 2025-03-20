import { Logo } from '@/components/common/logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { appRoutes } from '@/config/routes';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

type AuthFormWrapperProps = React.ComponentProps<'div'> & {
  title: string;
  description: string;
};

export function AuthFormWrapper({
  title,
  description,
  className,
  children,
  ...props
}: AuthFormWrapperProps) {
  return (
    <Card className='w-full' {...props}>
      <CardHeader className='text-center sm:px-8'>
        <Link to={appRoutes.public.home.path}>
          <Logo className='mb-1 text-2xl text-blue-500' />
        </Link>
        <CardTitle className='text-xl'>{title}</CardTitle>
        {description && (
          <CardDescription className='text-pretty'>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={cn('w-full sm:px-8', className)}>
        {children}
      </CardContent>
    </Card>
  );
}
