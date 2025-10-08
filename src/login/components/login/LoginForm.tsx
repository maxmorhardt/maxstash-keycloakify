import { Box, Button, Checkbox, FormControlLabel, Link, TextField } from '@mui/material';
import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import { I18n } from 'keycloakify/login/i18n';
import { KcContext } from 'keycloakify/login/KcContext';
import { useState } from 'react';
import PasswordWrapper from '../common/PasswordWrapper';

interface LoginFormProps {
  i18n: I18n;
  realm: KcContext.Login['realm'];
  url: KcContext.Login['url'];
  login: KcContext.Login['login'];
  messagesPerField: KcContext.Login['messagesPerField'];
  auth: KcContext.Login['auth'];
  usernameHidden: boolean | undefined;
}

export default function LoginForm({
  i18n,
  realm,
  url,
  login,
  messagesPerField,
  auth,
  usernameHidden,
}: LoginFormProps) {
  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  if (!realm.password) {
    return;
  }

  return (
    <form
      onSubmit={() => {
        setIsLoginButtonDisabled(true);
        return true;
      }}
      action={url.loginAction}
      method="post"
    >
      {!usernameHidden && (
        <Box mb={2}>
          <TextField
            fullWidth
            id="username"
            name="username"
            autoFocus
            autoComplete="username"
            slotProps={{
              input: {
                spellCheck: 'false',
              },
            }}
            label={
              !realm.loginWithEmailAllowed
                ? msg('username')
                : !realm.registrationEmailAsUsername
                  ? msg('usernameOrEmail')
                  : msg('email')
            }
            defaultValue={login.username ?? ''}
            error={messagesPerField.existsError('username', 'password')}
            helperText={
              messagesPerField.existsError('username', 'password') ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: kcSanitize(messagesPerField.getFirstError('username', 'password')),
                  }}
                />
              ) : undefined
            }
          />
        </Box>
      )}

      <Box mb={2}>
        <PasswordWrapper i18n={i18n} passwordInputId="password">
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            slotProps={{
              input: {
                spellCheck: 'false',
              },
            }}
            label={msg('password')}
            error={messagesPerField.existsError('username', 'password')}
            helperText={
              usernameHidden && messagesPerField.existsError('username', 'password') ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: kcSanitize(messagesPerField.getFirstError('username', 'password')),
                  }}
                />
              ) : undefined
            }
          />
        </PasswordWrapper>
      </Box>

      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        {realm.rememberMe && !usernameHidden && (
          <FormControlLabel
            control={<Checkbox name="rememberMe" defaultChecked={!!login.rememberMe} />}
            label={msg('rememberMe')}
          />
        )}

        {realm.resetPasswordAllowed && (
          <Link href={url.loginResetCredentialsUrl} tabIndex={6}>
            {msg('doForgotPassword')}
          </Link>
        )}
      </Box>

      <input type="hidden" name="credentialId" value={auth.selectedCredential} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={isLoginButtonDisabled}
      >
        {msgStr('doLogIn')}
      </Button>
    </form>
  );
}
