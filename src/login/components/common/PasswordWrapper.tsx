import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { I18n } from 'keycloakify/login/i18n';
import { useIsPasswordRevealed } from 'keycloakify/tools/useIsPasswordRevealed';
import { cloneElement } from 'react';

interface PasswordWrapperProps {
  i18n: I18n;
  passwordInputId: string;
  children: JSX.Element;
}

export default function PasswordWrapper({ i18n, passwordInputId, children }: PasswordWrapperProps) {
  const { msgStr } = i18n;

  const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
    passwordInputId,
  });

  return cloneElement(children, {
    type: isPasswordRevealed ? 'text' : 'password',
    InputProps: {
      ...(children.props.InputProps ?? {}),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label={msgStr(isPasswordRevealed ? 'hidePassword' : 'showPassword')}
            onClick={toggleIsPasswordRevealed}
            edge="end"
            size="small"
          >
            {isPasswordRevealed ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    },
  });
}
