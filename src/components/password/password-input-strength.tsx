import { PasswordInput } from '@/components/password/password-input';
import { PasswordRequirementsList } from '@/components/password/password-requirements-list';
import { PasswordStrengthIndicator } from '@/components/password/password-strength-indicator';
import { checkPasswordStrength } from '@/utils/password';
import { useMemo, useState } from 'react';

type PasswordInputStrengthProps = React.ComponentProps<'input'>;

export function PasswordInputStrength({
  className,
  onChange,
  ...props
}: PasswordInputStrengthProps) {
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const strength = checkPasswordStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  return (
    <div>
      <PasswordInput
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          onChange?.(e);
        }}
        onFocus={() => setIsFocused(true)}
        {...props}
      />
      {isFocused && (
        <>
          <PasswordStrengthIndicator strengthScore={strengthScore} />
          <PasswordRequirementsList
            strength={strength}
            strengthScore={strengthScore}
          />
        </>
      )}
    </div>
  );
}
