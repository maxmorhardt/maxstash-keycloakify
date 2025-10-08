import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  createTheme,
  CssBaseline,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import { getKcClsx, type KcClsx } from 'keycloakify/login/lib/kcClsx';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { JSX } from 'keycloakify/tools/JSX';
import { clsx } from 'keycloakify/tools/clsx';
import { useIsPasswordRevealed } from 'keycloakify/tools/useIsPasswordRevealed';
import { cloneElement, useState } from 'react';
import type { KcContext } from '../KcContext';
import type { I18n } from '../i18n';

export default function Login(props: PageProps<Extract<KcContext, { pageId: 'login.ftl' }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    messagesPerField,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Template
        kcContext={kcContext}
        i18n={i18n}
        doUseDefaultCss={false}
        displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
        displayMessage={!messagesPerField.existsError('username', 'password')}
        documentTitle=""
        headerNode={
          <Typography variant="h5" textAlign="center" gutterBottom>
            {msg('loginAccountTitle')}
          </Typography>
        }
        infoNode={
          <Box textAlign="center">
            <Typography component="span" variant="body2">
              {msg('noAccount')}{' '}
              <Link tabIndex={8} href={url.registrationUrl}>
                {msg('doRegister')}
              </Link>
            </Typography>
          </Box>
        }
        socialProvidersNode={
          <>
            {realm.password && social?.providers?.length ? (
              <Box mt={4}>
                <Divider />
                <Typography variant="h6" mt={2} mb={2}>
                  {msg('identity-provider-login-label')}
                </Typography>

                <Stack
                  direction="row"
                  flexWrap="wrap"
                  spacing={1}
                  justifyContent={social.providers.length > 3 ? 'space-between' : 'flex-start'}
                >
                  {social.providers.map((...[p, , providers]) => (
                    <Button
                      key={p.alias}
                      variant="outlined"
                      href={p.loginUrl}
                      startIcon={
                        p.iconClasses ? (
                          <i className={clsx(p.iconClasses)} aria-hidden="true" />
                        ) : undefined
                      }
                      sx={{
                        textTransform: 'none',
                        mb: 1,
                        flex: providers.length > 3 ? '0 1 calc(33% - 8px)' : 'auto',
                      }}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                        style={{ marginLeft: p.iconClasses ? 8 : 0 }}
                      />
                    </Button>
                  ))}
                </Stack>
              </Box>
            ) : null}
          </>
        }
      >
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
          <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 6 }}>
            <CardContent>
              {realm.password && (
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
                                __html: kcSanitize(
                                  messagesPerField.getFirstError('username', 'password')
                                ),
                              }}
                            />
                          ) : undefined
                        }
                      />
                    </Box>
                  )}

                  <Box mb={2}>
                    <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        label={msg('password')}
                        error={messagesPerField.existsError('username', 'password')}
                        helperText={
                          usernameHidden && messagesPerField.existsError('username', 'password') ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: kcSanitize(
                                  messagesPerField.getFirstError('username', 'password')
                                ),
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
              )}
            </CardContent>
          </Card>
        </Box>
      </Template>
    </ThemeProvider>
  );
}

interface PasswordWrapperProps {
  kcClsx: KcClsx;
  i18n: I18n;
  passwordInputId: string;
  children: JSX.Element;
}

function PasswordWrapper(props: PasswordWrapperProps) {
  const { i18n, passwordInputId, children } = props;
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
