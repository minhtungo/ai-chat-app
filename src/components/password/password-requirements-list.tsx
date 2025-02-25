import { CheckIcon, XIcon } from '@/components/icons';
import { cn } from '@/utils/cn';

type PasswordRequirementsListProps = React.ComponentProps<'ul'> & {
  strength: { met: boolean; text: string }[];
  strengthScore: number;
};

export function PasswordRequirementsList({
  strength,
  strengthScore,
  className,
  ...props
}: PasswordRequirementsListProps) {
  return (
    <>
      {/* <p
        id={`${id}-description`}
        className='text-foreground mb-2 text-sm font-medium'
      >
        {getPasswordStrengthText(strengthScore)}. Must contain:
      </p> */}
      <ul
        className={cn('space-y-1.5', className)}
        aria-label='Password requirements'
        {...props}
      >
        {strength.map((req, index) => (
          <li key={index} className='flex items-center gap-2'>
            {req.met ? (
              <CheckIcon
                size={16}
                className='text-emerald-500'
                aria-hidden='true'
              />
            ) : (
              <XIcon
                size={16}
                className='text-muted-foreground/80'
                aria-hidden='true'
              />
            )}
            <span
              className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}
            >
              {req.text}
              <span className='sr-only'>
                {req.met ? ' - Requirement met' : ' - Requirement not met'}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
