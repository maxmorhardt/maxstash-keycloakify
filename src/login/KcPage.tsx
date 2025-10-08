import { Suspense, lazy } from 'react';
import type { ClassKey } from 'keycloakify/login';
import type { KcContext } from './KcContext';
import { useI18n } from './i18n';
import DefaultPage from 'keycloakify/login/DefaultPage';
import Template from 'keycloakify/login/Template';
import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';

const UserProfileFormFields = lazy(() => import('keycloakify/login/UserProfileFormFields'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const doMakeUserConfirmPassword = true;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '.kcFormHeaderClass': { display: 'none !important' },
          '.kcHeaderClass': { display: 'none !important' },

          'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-internal-autofill-selected, textarea:-webkit-autofill, select:-webkit-autofill':
            {
              WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
              WebkitTextFillColor: `${darkTheme.palette.text.primary} !important`,
              caretColor: `${darkTheme.palette.text.primary} !important`,
              transition: 'background-color 9999s ease-in-out 0s !important',
              outline: 'none !important',
            },
        }}
      />

      <Suspense>
        {(() => {
          switch (kcContext.pageId) {
            case 'login.ftl':
              return (
                <Login
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              );
            case 'register.ftl':
              return (
                <Register
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={true}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              );
            default:
              return (
                <DefaultPage
                  kcContext={kcContext}
                  i18n={i18n}
                  classes={classes}
                  Template={Template}
                  doUseDefaultCss={true}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              );
          }
        })()}
      </Suspense>
    </ThemeProvider>
  );
}

const classes = {} satisfies { [key in ClassKey]?: string };
